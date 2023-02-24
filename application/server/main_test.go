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
func TestAvailability_200(t *testing.T) {
	res := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/ping", nil)
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 200, res.Code)
	assert.Equal(t, "hello", res.Body.String())
}

func TestCreateUser_201(t *testing.T) {
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

func TestCreateUser_409(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"Name": "A copy of Testing Admin",
		"Username": "testingadmin",
		"Email": "fail@gmail.com",
		"Password": "abc"
	}`)

	req, _ := http.NewRequest("POST", "/users/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 409, res.Code)
}

func TestCreateUser_400(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"FakeEntry": "this request is malformed"
	}`)

	req, _ := http.NewRequest("POST", "/users/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 400, res.Code)
}

func TestGetUser_200(t *testing.T) {
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

func TestGetUser_500(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"UserToken": "this is a totally legit token"
	}`)

	req, _ := http.NewRequest("POST", "/users/get", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 500, res.Code)
}

func TestLogin_200(t *testing.T) {
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

func TestLogin_404(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"Username": "this user doesn't exist in our database",
		"Password": "passw0rd"
	}`)

	req, _ := http.NewRequest("POST", "/users/login", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 404, res.Code)
}

func TestLogin_502(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"Username": "testingadmin",
		"Password": "a very, very incorrect password"
	}`)

	req, _ := http.NewRequest("POST", "/users/login", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 502, res.Code)
}

func TestCreateCharacter_201(t *testing.T) {
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

func TestCreateCharacter_400(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"OwnerToken": "hi"
	}`)

	req, _ := http.NewRequest("POST", "/characters/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 400, res.Code)
}

func TestCreateCharacter_500(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"Name": "Test Hero",
		"Description": "The most heroic hero in all of testing land",
		"Level": 50,
		"ClassType": 0,
		"OwnerToken": "definitely a legit token"
	}`)

	req, _ := http.NewRequest("POST", "/characters/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 500, res.Code)
}

func TestGetCharacters_200(t *testing.T) {
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

func TestGetCharacters_500(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"OwnerToken": "A totally legit token"
	}`)

	req, _ := http.NewRequest("POST", "/characters/get", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 500, res.Code)
}

func TestDeleteCharacter_202(t *testing.T) {
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

func TestDeleteCharacter_500(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"OwnerToken": "real token",
		"CharacterID": 2
	}`)

	req, _ := http.NewRequest("DELETE", "/characters/delete", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 500, res.Code)
}

func TestDeleteCharacter_403(t *testing.T) {
	res := httptest.NewRecorder()

	//JSON request and parsing information at https://www.kirandev.com/http-post-golang
	body := []byte(`{
		"OwnerToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RlciJ9.Bx8FNXdyly-sYAktvvFq9rY0qiQt7bN8j5Kb3ZU_2eI",
		"CharacterID": 4
	}`)

	req, _ := http.NewRequest("DELETE", "/characters/delete", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	assert.Equal(t, 403, res.Code)
}

func TestCreateItem_201(t *testing.T) {
	res := httptest.NewRecorder()

	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo",
		"Name": "Test item",
		"Description": "It's the best item",
		"LevelReq": 2,
		"ClassReq": 5
	}`)

	req, _ := http.NewRequest("POST", "/items/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &models.Item{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 201, res.Code)
	assert.Equal(t, "Test item", results.Name)
	assert.Equal(t, "It's the best item", results.Description)
	assert.Equal(t, uint(2), results.LevelReq)
	assert.Equal(t, uint(5), results.ClassReq)
}

func TestCreateItem_500(t *testing.T) {
	res := httptest.NewRecorder()

	// The token is for a non-existent user, will cause a 500 failure
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ",
		"Name": "Test item",
		"Description": "It's the best item",
		"LevelReq": 2,
		"ClassReq": 5
	}`)

	req, _ := http.NewRequest("POST", "/items/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	json.NewDecoder(res.Body).Decode(res)

	assert.Equal(t, 500, res.Code)
}

func TestCreateItem_403(t *testing.T) {
	res := httptest.NewRecorder()

	// The token is for an existing non-admin user, will cause a 403 forbidden status
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5vbmFkbWludXNlciJ9.OK2EEMmBhkmZ65-aSeZiAMx40BYfGTH7h4lO4HBmkxU",
		"Name": "Test item",
		"Description": "It's the best item",
		"LevelReq": 2,
		"ClassReq": 5
	}`)

	req, _ := http.NewRequest("POST", "/items/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	json.NewDecoder(res.Body).Decode(res)

	assert.Equal(t, 403, res.Code)
}

func TestGetItems_200(t *testing.T) {
	res := httptest.NewRecorder()

	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo"
	}`)

	req, _ := http.NewRequest("POST", "/items/get", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &[]models.Item{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 200, res.Code)
	assert.Equal(t, "Test item", (*results)[0].Name)
	assert.Equal(t, "It's the best item", (*results)[0].Description)
	assert.Equal(t, uint(2), (*results)[0].LevelReq)
	assert.Equal(t, uint(5), (*results)[0].ClassReq)
}

func TestGetItems_500(t *testing.T) {
	res := httptest.NewRecorder()

	// non-existent user token
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ"
	}`)

	req, _ := http.NewRequest("POST", "/items/get", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &[]models.Item{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 500, res.Code)
}

func TestGetItems_403(t *testing.T) {
	res := httptest.NewRecorder()

	// non-admin token
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5vbmFkbWludXNlciJ9.OK2EEMmBhkmZ65-aSeZiAMx40BYfGTH7h4lO4HBmkxU"
	}`)

	req, _ := http.NewRequest("POST", "/items/get", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &[]models.Item{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 403, res.Code)
}

func TestDeleteItem_202(t *testing.T) {
	res := httptest.NewRecorder()

	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo",
		"ItemID": 1
	}`)

	req, _ := http.NewRequest("DELETE", "/items/delete", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	json.NewDecoder(res.Body).Decode(res)

	assert.Equal(t, 202, res.Code)
}

func TestDeleteItem_500(t *testing.T) {
	res := httptest.NewRecorder()

	// non-existent user token
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ",
		"ItemID": 1
	}`)

	req, _ := http.NewRequest("DELETE", "/items/delete", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	json.NewDecoder(res.Body).Decode(res)

	assert.Equal(t, 500, res.Code)
}

func TestDeleteItem_403(t *testing.T) {
	res := httptest.NewRecorder()

	// non-admin token
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5vbmFkbWludXNlciJ9.OK2EEMmBhkmZ65-aSeZiAMx40BYfGTH7h4lO4HBmkxU",
		"ItemID": 1
	}`)

	req, _ := http.NewRequest("DELETE", "/items/delete", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	json.NewDecoder(res.Body).Decode(res)

	assert.Equal(t, 403, res.Code)
}

func TestCreateSpell_201(t *testing.T) {
	res := httptest.NewRecorder()

	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo",
		"Name": "Test spell",
		"Description": "It's the best spell",
		"LevelReq": 2,
		"ClassReq": 5
	}`)

	req, _ := http.NewRequest("POST", "/spells/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &models.Spell{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 201, res.Code)
	assert.Equal(t, "Test spell", results.Name)
	assert.Equal(t, "It's the best spell", results.Description)
	assert.Equal(t, uint(2), results.LevelReq)
	assert.Equal(t, uint(5), results.ClassReq)
}

func TestCreateSpell_500(t *testing.T) {
	res := httptest.NewRecorder()

	// non-existent user token
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ",
		"Name": "Test spell",
		"Description": "It's the best spell",
		"LevelReq": 2,
		"ClassReq": 5
	}`)

	req, _ := http.NewRequest("POST", "/spells/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &models.Spell{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 500, res.Code)
}

func TestCreateSpell_403(t *testing.T) {
	res := httptest.NewRecorder()

	// non-admin token
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5vbmFkbWludXNlciJ9.OK2EEMmBhkmZ65-aSeZiAMx40BYfGTH7h4lO4HBmkxU",
		"Name": "Test spell",
		"Description": "It's the best spell",
		"LevelReq": 2,
		"ClassReq": 5
	}`)

	req, _ := http.NewRequest("POST", "/spells/create", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &models.Spell{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 403, res.Code)
}

func TestGetSpells_200(t *testing.T) {
	res := httptest.NewRecorder()

	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo"
	}`)

	req, _ := http.NewRequest("POST", "/spells/get", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &[]models.Spell{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 200, res.Code)
	assert.Equal(t, "Test spell", (*results)[0].Name)
	assert.Equal(t, "It's the best spell", (*results)[0].Description)
	assert.Equal(t, uint(2), (*results)[0].LevelReq)
	assert.Equal(t, uint(5), (*results)[0].ClassReq)
}

func TestGetSpells_500(t *testing.T) {
	res := httptest.NewRecorder()

	// non-existent user token
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ"
	}`)

	req, _ := http.NewRequest("POST", "/spells/get", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &[]models.Spell{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 500, res.Code)
}

func TestGetSpells_403(t *testing.T) {
	res := httptest.NewRecorder()

	// non-admin token
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5vbmFkbWludXNlciJ9.OK2EEMmBhkmZ65-aSeZiAMx40BYfGTH7h4lO4HBmkxU"
	}`)

	req, _ := http.NewRequest("POST", "/spells/get", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	results := &[]models.Spell{}
	json.NewDecoder(res.Body).Decode(results)

	assert.Equal(t, 403, res.Code)
}

func TestDeleteSpell_202(t *testing.T) {
	res := httptest.NewRecorder()

	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo",
		"SpellID": 1
	}`)

	req, _ := http.NewRequest("DELETE", "/spells/delete", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	json.NewDecoder(res.Body).Decode(res)

	assert.Equal(t, 202, res.Code)
}

func TestDeleteSpell_500(t *testing.T) {
	res := httptest.NewRecorder()

	// non-existent user token
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ",
		"SpellID": 1
	}`)

	req, _ := http.NewRequest("DELETE", "/spells/delete", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	json.NewDecoder(res.Body).Decode(res)

	assert.Equal(t, 500, res.Code)
}

func TestDeleteSpell_403(t *testing.T) {
	res := httptest.NewRecorder()

	// non-admin token
	body := []byte(`{
		"AdminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5vbmFkbWludXNlciJ9.OK2EEMmBhkmZ65-aSeZiAMx40BYfGTH7h4lO4HBmkxU",
		"SpellID": 1
	}`)

	req, _ := http.NewRequest("DELETE", "/spells/delete", bytes.NewBuffer(body))
	router.Router.ServeHTTP(res, req)

	json.NewDecoder(res.Body).Decode(res)

	assert.Equal(t, 403, res.Code)
}
