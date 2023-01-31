package controllers

import (
	"fmt"
	"os"

	"backend/database"
	"backend/models"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"golang.org/x/crypto/bcrypt"
	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
)

type UserRepo struct {
	Db *gorm.DB
}

func New() *UserRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.User{})
	return &UserRepo{Db: db}
}

// create user
func (repository *UserRepo) CreateUser(c *gin.Context) {
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
	err = repository.Db.First(&existingUser, "username = ?", buildUser.Username).Error
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{"error": buildUser.Username})
		return
	}

	err = repository.Db.Create(&user).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, user)
}

// get user by username
func (repository *UserRepo) GetUser(c *gin.Context) {
	//Get the id parameter
	var username = c.Param("username")

	var user models.User
	err := repository.Db.First(&user, "username = ?", username).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": username})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, user)
}

// I tried to put this in a new shared Utils package but the func was "undefined" ?
func goDotEnvVariable(key string) string {
	err := godotenv.Load()

	if err != nil {
		fmt.Println("Error loading .env file")
	}

	return os.Getenv(key)
}

// TODO: (KH) break apart into separate methods to be called by LogIn
// i.e. method to CheckForExistingUser, method to CheckPassword, GenerateToken, etc. 
// maybe put in shared Utils or Helpers package? 
func (repository *UserRepo) LogIn(c *gin.Context) {
	var signInInput models.UserSignIn
	err := c.ShouldBindJSON(&signInInput)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	var user models.User
	err = repository.Db.First(&user, "username = ?", signInInput.Username).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": signInInput.Username})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(signInInput.Password))
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadGateway, gin.H{"error": signInInput.Password})
		return
	}

	secret := goDotEnvVariable("TOKEN_SECRET")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Username": signInInput.Username,
	})
	tokenString, err := token.SignedString([]byte(secret))

	fmt.Printf("%v", err)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token":tokenString})
}
