package controllers

import (
	"backend/database"
	"backend/models"

	"gorm.io/gorm"
)

type Repos struct {
	UserDb      *gorm.DB
	CharacterDb *gorm.DB
	SpellDb     *gorm.DB
	ItemDb      *gorm.DB
}

func New(test bool) *Repos {
	userdb := database.InitDb(test)
	userdb.AutoMigrate(&models.User{})

	characterdb := database.InitDb(test)
	characterdb.AutoMigrate(&models.Character{})

	spelldb := database.InitDb(test)
	spelldb.AutoMigrate(&models.Spell{})

	itemdb := database.InitDb(test)
	itemdb.AutoMigrate(&models.Item{})

	return &Repos{UserDb: userdb, CharacterDb: characterdb, SpellDb: spelldb, ItemDb: itemdb}
}
