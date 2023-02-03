package database

import (
	"fmt"

	"backend/utilities"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var Db *gorm.DB

func InitDb() *gorm.DB {
	Db = connectDB()
	return Db
}

func connectDB() *gorm.DB {
	var err error
	dbUser := utilities.GoDotEnvVariable("DB_USERNAME")
	dbPass := utilities.GoDotEnvVariable("DB_PASSWORD")

	dsn := fmt.Sprintf("%s:%s@tcp(theperfectpath.cot5mnpozher.us-east-2.rds.amazonaws.com)/perfectpathdb?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPass)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("Error connecting to database")
	} else {
		fmt.Println("Connected to database")
	}

	return db
}
