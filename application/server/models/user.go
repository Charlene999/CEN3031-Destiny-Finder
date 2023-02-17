package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID 		 int
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

type UserSignIn struct {
	Username string
	Password string
}

type GetUser struct {
	UserToken string
}
