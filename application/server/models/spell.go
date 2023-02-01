package models

import (
	"gorm.io/gorm"
)

// The following struct is not currently in use
type Spell struct {
	gorm.Model
	Name        string
	Description string
}
