package models

import (
	"gorm.io/gorm"
)

type Spell struct {
	gorm.Model
	Name        string
	Description string
	LevelReq    uint
	ClassReq    uint
}

type BuildSpell struct {
	AdminToken  string
	Name        string
	Description string
	LevelReq    uint
	ClassReq    uint
}

type DeleteSpell struct {
	AdminToken string
	SpellID    uint
}
