// Derived from example code at https://github.com/gin-gonic/gin
package test

import (
	"backend/models"
	"backend/router"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-playground/assert/v2"
)

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
