package controllers

import (
	"backend/database"
	"backend/models"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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
	user := models.User{Name: buildUser.Name, Username: buildUser.Username, Email: buildUser.Email, Password: buildUser.Password, IsAdmin: false}

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
