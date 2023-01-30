// Derived from example code at https://github.com/gin-gonic/gin
package main

import (
	"backend/controllers"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Create a router for the backend, create endpoints, and run the server
func main() {
	var router = gin.Default()
	//Using documentation at github.com/gin-contrib/cors
	var config = cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:4200"}

	router.Use(cors.New(config))

	//router.GET("/ping", ping)

	userRepo := controllers.New()
	router.POST("/users/create", userRepo.CreateUser)
	router.GET("/users/get/:username", userRepo.GetUser)

	router.Run()
}

// Implements functionality for the ping test endpoint. Try it out by visiting http://localhost:8080/ping
func ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "The time is " + time.Now().Format(time.UnixDate) + ".",
	})
}
