package controllers

import (
	"fmt"

	"backend/models"
	"backend/utilities"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

func DoesUserExist(username string, repository *Repos, user *models.User) (bool, error) {
	err := repository.UserDb.First(&user, "username = ?", username).Error

	// returns t/f and always returns the err
	return !errors.Is(err, gorm.ErrRecordNotFound), err
}

// Create user
func (repository *Repos) CreateUser(c *gin.Context) {
	var buildUser models.BuildUser
	err := c.ShouldBindJSON(&buildUser)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := utilities.HashPassword(buildUser.Password)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"Could not hash password": buildUser.Password})
		return
	}

	user := models.User{Name: buildUser.Name, Username: buildUser.Username, Email: buildUser.Email, Password: string(hashedPassword), IsAdmin: false}

	// _ means discard this err - if the user exists there will be an err, which is fine for this purpose
	userExists, _ := DoesUserExist(buildUser.Username, repository, &user)
	//Check to make sure there is no other user with the same username
	if userExists {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{"User already exists with this username": buildUser.Username})
		return
	}

	err = repository.UserDb.Create(&user).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}

// Get user by token
func (repository *Repos) GetUser(c *gin.Context) {
	var getUser models.GetUser
	err := c.ShouldBindJSON(&getUser)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(getUser.UserToken, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Find the user
	var user models.User
	err = repository.UserDb.First(&user, "username = ?", claims["Username"]).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}

func (repository *Repos) LogIn(c *gin.Context) {
	var signInInput models.UserSignIn
	err := c.ShouldBindJSON(&signInInput)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	userExists, err := DoesUserExist(signInInput.Username, repository, &user)
	if !userExists {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"User not found": signInInput.Username})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	utilities.CheckPassword(user.Password, signInInput.Password)

	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Username": signInInput.Username,
	})
	tokenString, err := token.SignedString([]byte(secret))

	fmt.Printf("%v", err)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
