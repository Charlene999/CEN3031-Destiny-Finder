package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Username string
	Email    string
	Password string
	IsAdmin  bool
}

type BuildUser struct {
	Name     string
	Username string
	Email    string
	Password string
}
