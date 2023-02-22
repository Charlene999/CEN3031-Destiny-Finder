// Derived from example code at https://github.com/gin-gonic/gin
package main

import (
	"backend/router"
)

// Create a router for the backend, create endpoints, and run the server
func main() {
	router.PrepareRouter().Run()
}
