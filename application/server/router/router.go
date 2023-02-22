package router

import (
	"backend/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var Router = gin.Default()

func PrepareRouter() *gin.Engine {
	//Using documentation at github.com/gin-contrib/cors
	var config = cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:4200"}

	Router.Use(cors.New(config))

	repos := controllers.New()
	Router.GET("/ping", controllers.Ping)

	Router.POST("/users/create", repos.CreateUser)
	Router.POST("/users/get", repos.GetUser)
	Router.POST("/users/login", repos.LogIn)

	Router.POST("/characters/create", repos.CreateCharacter)
	Router.POST("/characters/get", repos.GetCharacters)
	Router.DELETE("/characters/delete", repos.DeleteCharacter)

	Router.POST("/spells/create", repos.CreateSpell)
	Router.POST("/spells/get", repos.GetSpells)
	Router.DELETE("/spells/delete", repos.DeleteSpell)

	Router.POST("/items/create", repos.CreateItem)
	Router.POST("/items/get", repos.GetItems)
	Router.DELETE("/items/delete", repos.DeleteItem)

	return Router
}
