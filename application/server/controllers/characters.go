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
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if buildCharacter.Description == "" || buildCharacter.Level == 0 || buildCharacter.Name == "" || buildCharacter.OwnerToken == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Missing a name, level, description, or owner token"})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(buildCharacter.OwnerToken, claims, func(token *jwt.Token) (interface{}, error) {
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

	character := models.Character{Name: buildCharacter.Name, Description: buildCharacter.Description, Level: buildCharacter.Level, ClassType: buildCharacter.ClassType,
		Owner: user}

	err = repository.CharacterDb.Create(&character).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, character)
}

// Get characters associated with user by token
func (repository *Repos) GetCharacters(c *gin.Context) {
	var getCharacters models.GetCharacters
	err := c.ShouldBindJSON(&getCharacters)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(getCharacters.OwnerToken, claims, func(token *jwt.Token) (interface{}, error) {
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

	//Find the user's characters
	var characters []models.Character
	err = repository.CharacterDb.Model(&models.Character{}).Preload("Spells").Preload("Items").Find(&characters, "owner_id = ?", user.ID).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": user.ID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, characters)
}

// Delete character provided a user token and character id
func (repository *Repos) DeleteCharacter(c *gin.Context) {
	var deleteCharacter models.DeleteCharacter
	err := c.ShouldBindJSON(&deleteCharacter)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(deleteCharacter.OwnerToken, claims, func(token *jwt.Token) (interface{}, error) {
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

	//Determine if the user has permission to delete the character (either they are an admin or the owner)
	var character models.Character
	err = repository.CharacterDb.Preload("Items").Preload("Spells").First(&character, "id = ?", deleteCharacter.CharacterID).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": deleteCharacter.CharacterID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if character.OwnerID != user.ID && !user.IsAdmin {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": user.ID})
		return
	}

	repository.CharacterDb.Debug().Model(&character).Association("Items").Delete(&character.Items)
	repository.CharacterDb.Debug().Model(&character).Association("Spells").Delete(&character.Spells)

	//Delete the character (hard delete)
	err = repository.CharacterDb.Unscoped().Delete(&models.Character{}, deleteCharacter.CharacterID).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusAccepted, character)
}

// Update character provided a user token and character id
func (repository *Repos) UpdateCharacter(c *gin.Context) {
	var updateCharacter models.UpdateCharacter
	err := c.ShouldBindJSON(&updateCharacter)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(updateCharacter.OwnerToken, claims, func(token *jwt.Token) (interface{}, error) {
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

	//Determine if the user has permission to update the character (either they are an admin or the owner)
	var character models.Character
	err = repository.CharacterDb.Preload("Items").Preload("Spells").First(&character, "id = ?", updateCharacter.CharacterID).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": updateCharacter.CharacterID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if character.OwnerID != user.ID && !user.IsAdmin {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": user.ID})
		return
	}

	if updateCharacter.Name != "" {
		character.Name = updateCharacter.Name
	}
	if updateCharacter.Description != "" {
		character.Description = updateCharacter.Description
	}
	if updateCharacter.Level > 0 {
		character.Level = uint(updateCharacter.Level)

		//Remove any items affected by changing the Level
		var itemsToRemove []models.Item
		for i := 0; i < len(character.Items); i++ {
			if character.Items[i].LevelReq > uint(updateCharacter.Level) {
				itemsToRemove = append(itemsToRemove, character.Items[i])
			}
		}
		err = repository.CharacterDb.Debug().Model(&character).Association("Items").Delete(&itemsToRemove)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		//Remove any spells affected by changing the Level
		var spellsToRemove []models.Spell
		for i := 0; i < len(character.Spells); i++ {
			if character.Spells[i].LevelReq > uint(updateCharacter.Level) {
				spellsToRemove = append(spellsToRemove, character.Spells[i])
			}
		}
		err = repository.CharacterDb.Debug().Model(&character).Association("Spells").Delete(&spellsToRemove)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}
	if updateCharacter.ClassType > 0 {
		character.ClassType = uint(updateCharacter.ClassType)

		//Remove any items affected by changing the ClassType
		var itemsToRemove []models.Item
		for i := 0; i < len(character.Items); i++ {
			if character.Items[i].ClassReq != uint(updateCharacter.ClassType) {
				itemsToRemove = append(itemsToRemove, character.Items[i])
			}
		}
		err = repository.CharacterDb.Debug().Model(&character).Association("Items").Delete(&itemsToRemove)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		//Remove any spells affected by changing the ClassType
		var spellsToRemove []models.Spell
		for i := 0; i < len(character.Spells); i++ {
			if character.Spells[i].ClassReq > uint(updateCharacter.ClassType) {
				spellsToRemove = append(spellsToRemove, character.Spells[i])
			}
		}
		err = repository.CharacterDb.Debug().Model(&character).Association("Spells").Delete(&spellsToRemove)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	repository.CharacterDb.Save(&character)

	c.JSON(http.StatusAccepted, &character)
}

func (repository *Repos) AddItemToCharacter(c *gin.Context) {
	var itemToAdd models.AddRemoveCharacterItem
	err := c.ShouldBindJSON(&itemToAdd)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(itemToAdd.OwnerToken, claims, func(token *jwt.Token) (interface{}, error) {
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

	//Determine if the user has permission to add items to the character (either they are an admin or the owner)
	var character models.Character
	err = repository.CharacterDb.First(&character, "id = ?", itemToAdd.CharacterID).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": itemToAdd.CharacterID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if character.OwnerID != user.ID && !user.IsAdmin {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": user.ID})
		return
	}

	var item models.Item
	err = repository.ItemDb.First(&item, "id = ?", itemToAdd.ItemID).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": itemToAdd.ItemID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if item.ClassReq != character.ClassType && !(item.LevelReq <= character.Level) {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "This item is not available to this character's ClassType and Level"})
		return
	} else if item.ClassReq != character.ClassType {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "This item is not available to this character's ClassType"})
		return
	} else if !(item.LevelReq <= character.Level) {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "This item is not available to this character's Level"})
		return
	}

	err = repository.CharacterDb.Debug().Model(&character).Association("Items").Append([]models.Item{item})
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusAccepted, &item)
}

func (repository *Repos) AddSpellToCharacter(c *gin.Context) {
	var spellToAdd models.AddRemoveCharacterSpell
	err := c.ShouldBindJSON(&spellToAdd)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(spellToAdd.OwnerToken, claims, func(token *jwt.Token) (interface{}, error) {
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

	//Determine if the user has permission to add spells to the character (either they are an admin or the owner)
	var character models.Character
	err = repository.CharacterDb.First(&character, "id = ?", spellToAdd.CharacterID).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": spellToAdd.CharacterID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if character.OwnerID != user.ID && !user.IsAdmin {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": user.ID})
		return
	}

	// get the spell to add
	var spell models.Spell
	err = repository.SpellDb.First(&spell, "id = ?", spellToAdd.SpellID).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": spellToAdd.SpellID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if spell.ClassReq != character.ClassType && !(spell.LevelReq <= character.Level) {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "This spell is not available to this character's ClassType and Level"})
		return
	} else if spell.ClassReq != character.ClassType {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "This spell is not available to this character's ClassType"})
		return
	} else if !(spell.LevelReq <= character.Level) {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "This spell is not available to this character's Level"})
		return
	}

	err = repository.CharacterDb.Debug().Model(&character).Association("Spells").Append([]models.Spell{spell})
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusAccepted, &spell)
}

func (repository *Repos) RemoveItemFromCharacter(c *gin.Context) {
	var itemToRemove models.AddRemoveCharacterItem
	err := c.ShouldBindJSON(&itemToRemove)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(itemToRemove.OwnerToken, claims, func(token *jwt.Token) (interface{}, error) {
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

	//Determine if the user has permission to remove items to the character (either they are an admin or the owner)
	var character models.Character
	err = repository.CharacterDb.First(&character, "id = ?", itemToRemove.CharacterID).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": itemToRemove.CharacterID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if character.OwnerID != user.ID && !user.IsAdmin {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": user.ID})
		return
	}

	var item models.Item
	err = repository.ItemDb.First(&item, "id = ?", itemToRemove.ItemID).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": itemToRemove.ItemID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = repository.CharacterDb.Debug().Model(&character).Association("Items").Delete([]models.Item{item})
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusAccepted, &item)
}

func (repository *Repos) RemoveSpellFromCharacter(c *gin.Context) {
	var spellToRemove models.AddRemoveCharacterSpell
	err := c.ShouldBindJSON(&spellToRemove)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Identify the user from the provided token
	secret := utilities.GoDotEnvVariable("TOKEN_SECRET")
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(spellToRemove.OwnerToken, claims, func(token *jwt.Token) (interface{}, error) {
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

	//Determine if the user has permission to remove spells to the character (either they are an admin or the owner)
	var character models.Character
	err = repository.CharacterDb.First(&character, "id = ?", spellToRemove.CharacterID).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": spellToRemove.CharacterID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if character.OwnerID != user.ID && !user.IsAdmin {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": user.ID})
		return
	}

	var spell models.Spell
	err = repository.SpellDb.First(&spell, "id = ?", spellToRemove.SpellID).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": spellToRemove.SpellID})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = repository.CharacterDb.Debug().Model(&character).Association("Spells").Delete([]models.Spell{spell})
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusAccepted, &spell)
}
