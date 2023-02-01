package models

import (
	"gorm.io/gorm"
)

type Character struct {
	gorm.Model
	Name        string
	Description string
	Level       uint
	OwnerId     uint   //References a User by their unique Id
	SpellIds    string //References Spells by their unique Ids (comma-separated)
	ItemIds     string //References Items by their unique Ids (comma-separated)
}

type BuildCharacter struct {
	Name        string
	Description string
	Level       uint
	OwnerToken  string
}

type GetCharacters struct {
	OwnerToken string
}
