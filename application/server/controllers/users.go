package controllers

import (
	"fmt"

	"backend/models"
	"backend/utilities"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Create user
func (repository *Repos) CreateUser(c *gin.Context) {
	var buildUser models.BuildUser
	err := c.ShouldBindJSON(&buildUser)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(buildUser.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Could not hash password"})
		return
	}

	user := models.User{Name: buildUser.Name, Username: buildUser.Username, Email: buildUser.Email, Password: string(hashedPassword), IsAdmin: false}

	//Check to make sure there is no other user with the same username
	var existingUser models.User
	err = repository.UserDb.First(&existingUser, "username = ?", buildUser.Username).Error
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{"error": buildUser.Username})
		return
	}

	err = repository.UserDb.Create(&user).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, user)
}

// Get user by token
func (repository *Repos) GetUser(c *gin.Context) {
	var getUser models.GetUser
	err := c.ShouldBindJSON(&getUser)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(getUser.UserToken, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	//Find the user
	var user models.User
	err = repository.UserDb.First(&user, "username = ?", claims["Username"]).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, user)
}

// TODO: (KH) break apart into separate methods to be called by LogIn
// i.e. method to CheckForExistingUser, method to CheckPassword, GenerateToken, etc.
// maybe put in shared Utils or Helpers package?
func (repository *Repos) LogIn(c *gin.Context) {
	var signInInput models.UserSignIn
	err := c.ShouldBindJSON(&signInInput)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	var user models.User
	err = repository.UserDb.First(&user, "username = ?", signInInput.Username).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": signInInput.Username})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(signInInput.Password))
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadGateway, gin.H{"error": signInInput.Password})
		return
	}

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
