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

func (repository *Repos) CreateSpell(c *gin.Context) {
	var buildSpell models.BuildSpell
	err := c.ShouldBindJSON(&buildSpell)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(buildSpell.AdminToken, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Get the user's information
	var user models.User
	err = repository.UserDb.First(&user, "username = ?", claims["Username"]).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if !user.IsAdmin {
		c.AbortWithStatusJSON(http.StatusForbidden, "User is not an admin")
		return
	}

	spell := models.Spell{Name: buildSpell.Name, Description: buildSpell.Description, LevelReq: buildSpell.LevelReq, ClassReq: buildSpell.ClassReq}

	err = repository.SpellDb.Create(&spell).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, spell)
}

func (repository *Repos) GetSpells(c *gin.Context) {
	// just get all of them for listing, later we'll add an endpoint to get individual ones
	var spells []models.Spell
	err := repository.SpellDb.Find(&spells).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "No spells were found in the database"})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, spells)
}

func (repository *Repos) DeleteSpell(c *gin.Context) {
	var deleteSpell models.DeleteSpell
	err := c.ShouldBindJSON(&deleteSpell)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(deleteSpell.AdminToken, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	err = repository.UserDb.First(&user, "username = ?", claims["Username"]).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if !user.IsAdmin {
		c.AbortWithStatusJSON(http.StatusForbidden, "User is not an admin")
		return
	}

	//Delete the spell (hard delete)
	err = repository.SpellDb.Unscoped().Delete(&models.Spell{}, deleteSpell.SpellID).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{"Successfully deleted spell": deleteSpell.SpellID})
}

// Note that sending empty body gets all spells
func (repository *Repos) GetFilteredSpells(c *gin.Context) {
	var spellFilters models.FilterSpells
	err := c.ShouldBindJSON(&spellFilters)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var spells []models.Spell
	err = repository.SpellDb.Where(&models.Spell{LevelReq: spellFilters.LevelReq, ClassReq: spellFilters.ClassReq}).Find(&spells).Error

	if errors.Is(err, gorm.ErrRecordNotFound) || len(spells) == 0 {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "No spells matching these filters were found in the database"})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, spells)
}
