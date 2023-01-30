package database

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func goDotEnvVariable(key string) string {
	err := godotenv.Load()

	if err != nil {
		fmt.Println("Error loading .env file")
	}

	return os.Getenv(key)
}

var Db *gorm.DB

func InitDb() *gorm.DB {
	Db = connectDB()
	return Db
}

func connectDB() *gorm.DB {
	var err error
	dbUser := goDotEnvVariable("DB_USERNAME")
	dbPass := goDotEnvVariable("DB_PASSWORD")

	dsn := fmt.Sprintf("%s:%s@tcp(theperfectpath.cot5mnpozher.us-east-2.rds.amazonaws.com)/perfectpathdb?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPass)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("Error connecting to database : error=%v", err)
	} else {
		fmt.Println("Connected to database")
	}

	return db
}
