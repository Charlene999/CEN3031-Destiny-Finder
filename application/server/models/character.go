package models

import (
	"gorm.io/gorm"
)

type Character struct {
	gorm.Model
	Name        string
	Description string
	Level       uint
	ClassType   uint
	OwnerID     uint
	Owner       User    `gorm:"foreignkey:OwnerID"`
	Spells      []Spell `gorm:"many2many:character_spells;"`
	Items       []Item  `gorm:"many2many:character_items;"`
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

type DeleteCharacter struct {
	OwnerToken  string
	CharacterID uint
}
