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
	AdminToken 	string
	SpellID    	uint
}

type UpdateSpell struct {
	Name        string
	Description string
	LevelReq    uint
	ClassReq    uint
	AdminToken  string
	SpellID     uint
}

type FilterSpells struct {
	LevelReq uint
	ClassReq uint
}
