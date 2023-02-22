// Derived from example code at https://github.com/gin-gonic/gin
package main

import (
	"backend/router"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/go-playground/assert/v2"
)

// Entry point of the automated testing library
func TestMain(m *testing.M) {
	router.PrepareRouter()
	os.Exit(m.Run())
}

// Performs unit tests
// Ping the server until it responds, then execute the rest of the unit tests
// Test based on documentation at https://gin-gonic.com/docs/testing/
func TestAvailability(t *testing.T) {
	record := httptest.NewRecorder()
	request, _ := http.NewRequest("GET", "/ping", nil)
	router.Router.ServeHTTP(record, request)

	assert.Equal(t, 200, record.Code)
	assert.Equal(t, "hello", record.Body.String())
}
