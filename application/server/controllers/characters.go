package controllers

import (
	"backend/models"
	"backend/utilities"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

// Create character
func (repository *Repos) CreateCharacter(c *gin.Context) {
	var buildCharacter models.BuildCharacter
	err := c.ShouldBindJSON(&buildCharacter)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(buildCharacter.OwnerToken, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	//Get the user's information
	var user models.User
	err = repository.UserDb.First(&user, "username = ?", claims["Username"]).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	character := models.Character{Name: buildCharacter.Name, Description: buildCharacter.Description, Level: buildCharacter.Level,
		OwnerId: user.ID, SpellIds: "", ItemIds: ""}

	err = repository.CharacterDb.Create(&character).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, character)
}

// Get characters associated with user by token
func (repository *Repos) GetCharacters(c *gin.Context) {
	var getCharacters models.GetCharacters
	err := c.ShouldBindJSON(&getCharacters)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(getCharacters.OwnerToken, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	var user models.User
	err = repository.UserDb.First(&user, "username = ?", claims["Username"]).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	//Find the user's characters
	var characters []models.Character
	err = repository.CharacterDb.Find(&characters, "owner_id = ?", user.ID).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": user.ID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, characters)
}
