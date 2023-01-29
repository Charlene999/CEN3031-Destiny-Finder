package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	userId    int
	name  string
	username string
	email string
	password string
	isAdmin bool
}

func CreateUser(db *gorm.DB, User *User) (err error) {
	err = db.Create(User).Error
	if err != nil {
		return err
	}
	return nil
}
