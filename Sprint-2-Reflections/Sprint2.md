# Sprint 2 Report

## Work Completed

## Frontend Cypress and Unit Tests

## Backend API Unit Tests

## Backend API Documentation     
So far, endpoints have been grouped by whether they manage Users or Characters, with endpoint groups for Items and Spells in development.    
### User API Endpoints

### Character API Endpoints    
#### POST /characters/create    
The request body should contain the following attributes: Name (string), Description (string), Level (uint), and OwnerToken (string). 
The provided OwnerToken should be a JWT representing the User the Character should belong to. The request body should be sent in the form application/json.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 201 Created status will be sent back along with the created Character's attributes as defined in /server/models/character.go.

#### POST /characters/get
The request body should contain the following attributes: OwnerToken (string).
The provided OwnerToken should be a JWT representing the User for which Characters should be found for. The request body should be sent in the form application/json.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
If no Characters for a User are found, a 404 Not Found status will be sent back along with a key value pair of "error" and the User ID of the User who was represented by the JWT.
Upon successful completion of the operation, a 200 OK status will be sent along with a list of Characters and their attributes as defined in /server/models/character.go.

#### DELETE /characters/delete
The request body should contain the following attributes: OwnerToken (string) and CharacterID (uint).
The provided OwnerToken should be a JWT representing the User performing the request. The CharacterID should be a valid ID representing a character. The request body should be sent in the form application/json.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
If the provided CharacterID does not reference a valid Character in the database, a 404 Not Found status will be sent back along with a key value pair of "error" and the invalid CharacterID.
If the provided OwnerToken does not represent a User owning the Character (i.e. some other User owns the Character) and the User is not an admin, a 403 Forbidden status will be sent back along with a key value pair of "error" and the invalid User ID.
Upon successful completion of the operation, a 202 Accepted status will be sent back along with the attributes of the deleted character as defined in /sever/models/character.go.
