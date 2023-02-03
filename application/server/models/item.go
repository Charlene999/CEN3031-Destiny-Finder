package models

import (
	"gorm.io/gorm"
)

// The following struct is not currently in use
type Item struct {
	gorm.Model
	Name        string
	Description string
}
