// Derived from example code at https://github.com/gin-gonic/gin
package main

import (
	"backend/models"
	"backend/router"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/go-playground/assert/v2"
)

// Entry point of the automated testing library
func TestMain(m *testing.M) {
	router.PrepareRouter(true)
	os.Exit(m.Run())
}

// Ping the server until it responds, then execute the rest of the unit tests
// Test based on documentation at https://gin-gonic.com/docs/testing/
func TestAvailability(t *testing.T) {
	res := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/ping", nil)
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 200, res.Code)
	assert.Equal(t, "hello", res.Body.String())
}

func TestCreateUser(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"Name": "Tester5",
		"Username": "tester5",
		"Email": "tester5@gmail.com",
		"Password": "password"
	}`)

	req, _ := http.NewRequest("POST", "/users/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &models.User{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 201, res.Code)
	assert.Equal(t, "Tester5", results.Name)
	assert.Equal(t, "tester5", results.Username)
	assert.Equal(t, "tester5@gmail.com", results.Email)
	assert.Equal(t, false, results.IsAdmin)
}

func TestGetUser(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"UserToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo"
	}`)

	req, _ := http.NewRequest("POST", "/users/get", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &models.User{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 200, res.Code)
	assert.Equal(t, "Testing Admin", results.Name)
	assert.Equal(t, "testingadmin", results.Username)
	assert.Equal(t, "testing.admin@gmail.com", results.Email)
	assert.Equal(t, "$2a$10$OBbdUQsZQiVohVwG8AzyZeyvlZfNuyRH/NaSrgKFNAtv6v8B/K2JO", results.Password)
	assert.Equal(t, true, results.IsAdmin)
}

func TestLogin(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"Username": "testingadmin",
		"Password": "password"
	}`)

	req, _ := http.NewRequest("POST", "/users/login", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	type GrabToken struct {
		Token string `json:"token"`
	}
	results := &GrabToken{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 200, res.Code)
	assert.Equal(t, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo", results.Token)
}

func TestCreateCharacter(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"Name": "Test Hero",
		"Description": "The most heroic hero in all of testing land",
		"Level": 50,
		"ClassType": 0,
		"OwnerToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo"
	}`)

	req, _ := http.NewRequest("POST", "/characters/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &models.Character{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 201, res.Code)
	assert.Equal(t, "Test Hero", results.Name)
	assert.Equal(t, "The most heroic hero in all of testing land", results.Description)
	assert.Equal(t, uint(50), results.Level)
	assert.Equal(t, uint(0), results.ClassType)
	var spells []models.Spell
	assert.Equal(t, spells, results.Spells)
	var items []models.Item
	assert.Equal(t, items, results.Items)
}

func TestGetCharacters(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"OwnerToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo"
	}`)

	req, _ := http.NewRequest("POST", "/characters/get", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &[]models.Character{}
	json.NewDecoder(res.Body).Decode(results)

	testHero := -1
	for i := 0; i < len(*results); i++ {
		if (*results)[i].Name == "Test Hero" {
			testHero = i
			break
		}
	}

	assert.NotEqual(t, testHero, -1)
	if testHero == -1 {
		return
	}

	assert.Equal(t, 200, res.Code)
	assert.Equal(t, "Test Hero", (*results)[testHero].Name)
	assert.Equal(t, "The most heroic hero in all of testing land", (*results)[testHero].Description)
	assert.Equal(t, uint(50), (*results)[testHero].Level)
	assert.Equal(t, uint(0), (*results)[testHero].ClassType)
	var spells []models.Spell
	assert.Equal(t, spells, (*results)[testHero].Spells)
	var items []models.Item
	assert.Equal(t, items, (*results)[testHero].Items)
}

func TestDeleteCharacter(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"OwnerToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo",
		"CharacterID": 2
	}`)

	req, _ := http.NewRequest("DELETE", "/characters/delete", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &models.Character{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 202, res.Code)
	assert.Equal(t, "Test Hero", results.Name)
	assert.Equal(t, "The most heroic hero in all of testing land", results.Description)
	assert.Equal(t, uint(50), results.Level)
	assert.Equal(t, uint(0), results.ClassType)
	var spells []models.Spell
	assert.Equal(t, spells, results.Spells)
	var items []models.Item
	assert.Equal(t, items, results.Items)
}
