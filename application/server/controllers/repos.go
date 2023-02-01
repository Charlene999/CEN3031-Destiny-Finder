package controllers

import (
	"backend/database"
	"backend/models"

	"gorm.io/gorm"
)

type Repos struct {
	UserDb      *gorm.DB
	CharacterDb *gorm.DB
}

func New() *Repos {
	userdb := database.InitDb()
	userdb.AutoMigrate(&models.User{})

	characterdb := database.InitDb()
	characterdb.AutoMigrate(&models.Character{})

	return &Repos{UserDb: userdb, CharacterDb: characterdb}
}
