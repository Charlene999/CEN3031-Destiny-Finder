package models

import (
	"gorm.io/gorm"
)

type Item struct {
	gorm.Model
	Name        string
	Description string
	LevelReq    uint
	ClassReq    uint
}

type BuildItem struct {
	AdminToken  string
	Name        string
	Description string
	LevelReq    uint
	ClassReq    uint
}

type DeleteItem struct {
	AdminToken string
	ItemID     uint
}

type UpdateItem struct {
	Name        string
	Description string
	LevelReq    int
	ClassReq    int
	AdminToken  string
	ItemID      uint
}
