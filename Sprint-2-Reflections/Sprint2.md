# Sprint 2 Report

## Work Completed
As almost all functionality planned in Sprint 1 was completed, our team moved forward in completing new issues related to character creating, viewing, and deletion along with the implementation of creating, viewing, and deleting spells and items that characters can be given. Most of the frontend and backend functionality for user, character, item, and spell creation, viewing, deletion, etc. has been connected by this point.

### Frontend Accomplishments

### Backend Accomplishments
Firstly, the delete character endpoint (/characters/delete) was added to finish character API functionality in the backend for now. Then, the router creation was reorganized to allow for the creation of a new testing entry point in addition to the main entry point. A special testing database was set up and implemented in order to separate testing from the main database. 
Furthermore, item and spell schemas were updated, and item and spell creation, getting, and deletion endpoints (6 in total) were added to the backend. 
Finally, multiple unit tests were written for each endpoint created so far.

## Frontend Cypress and Unit Tests

## Backend API Unit Tests
Unit tests were designed in order to test the functionality of each server endpoint. To faciliate this, the tests first start the router and controllers in the same fashion as during regular operation, but a connection to the special testing database is made rather than the main database. Each of the unit tests is contained in a singular function; they are listed below.

### Miscellaneous Tests
- TestAvailability_200 - Tests for a 200 OK status response to the /ping endpoint to ensure that the server is running and serving requests.

### User Tests
- TestCreateUser_201 - Tests to ensure that users can be created as expected.

- TestCreateUser_409 - Tests attempting to erroneously create a user with a username that already exists in the database.

- TestCreateUser_400 - Tests attempting to send a malformed request to the create user endpoint.

- TestGetUser_200 - Tests to ensure that infromation about users can be obtained as expected.

- TestGetUser_500 - Tests to ensure that the get user endpoint can gracefully handle a malformed JWT.

- TestLogin_200 - Tests to ensure that users can sucessfully login and receive a JWT.

- TestLogin_404 - Tests to ensure that a 404 Not Found status is returned in the event a user is not found in the database while logging in.

- TestLogin_502 - Tests to ensure that the server will reject an invalid username/password combination.

### Character Tests
- TestCreateCharacter_201 - Tests to ensure that a character can be created as expected.

- TestCreateCharacter_400 - Tests to ensure that the create user endpoint can gracefully handle a malformed request.

- TestCreateCharacter_500 - Tests to ensure that the create user endpoint can gracefully handle a malformed JWT.

- TestGetCharacters_200 - Tests to ensure that a user's characters can be obtained as expected.

- TestGetCharacters_500 - Tests to ensure that the get character endpoint can gracefully handle a malformed JWT.

- TestDeleteCharacter_202 - Tests to ensure that a user's character can be deleted as expected.

- TestDeleteCharacter_500 - Tests to ensure that the delete character endpoint can gracefully handle a malformed JWT.

- TestDeleteCharacter_403 - Tests to ensure that non-admin users cannot delete other users' characters.

### Item Tests
- TestCreateItem_201 - Tests to ensure that an item can be created as expected.

- TestCreateItem_500 - Tests to ensure that the create item endpoint fails gracefully if the user identified by the token is non-existent.

- TestCreateItem_403 - Tests to ensure that the create item endpoint fails gracefully if the user identified by the token is not an admin.

- TestGetItems_200 - Tests to ensure that all items can be retrieved as expected.

- TestDeleteItem_202 - Tests to ensure that an item can be deleted as expected.

- TestDeleteItem_500 - Tests to ensure that the delete item endpoint fails gracefully if the user identified by the token is non-existent.

- TestDeleteItem_403 - Tests to ensure that the delete item endpoint fails gracefully if the user identified by the token is not an admin.

### Spell Tests
- TestCreateSpell_201 - Tests to ensure that a spell can be created as expected.

- TestCreateSpell_500 - Tests to ensure that the create spell endpoint fails gracefully if the user identified by the token is non-existent.

- TestCreateSpell_403 - Tests to ensure that the create spell endpoint fails gracefully if the user identified by the token is not an admin.

- TestGetSpells_200 - Tests to ensure that all spells can be retrieved as expected.

- TestDeleteSpell_202 Tests to ensure that a spell can be deleted as expected.

- TestDeleteSpell_500 - Tests to ensure that the delete spell endpoint fails gracefully if the user identified by the token is non-existent.

- TestDeleteSpell_403 - Tests to ensure that the delete spell endpoint fails gracefully if the user identified by the token is not an admin.

## Backend API Documentation     
So far, endpoints have been grouped by whether they manage Users, Characters, Items, or Spells.  

### User API Endpoints
#### POST /users/create
The request body should contain the following attributes: ```Name``` (string), ```Username``` (string), ```Email``` (string), and ```Password``` (string). 
The request body should be sent in the form application/json.
The provided ```Username``` must be unique within the database; otherwise, a 409 Conflict status will be sent back along with an error message.
If an error occurs while hashing the password, a 502 Bad Gateway status will be sent back along with a key value pair of "error" and the accompanying error description.
If any other errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 201 Created Status will be sent back along with the created User's attributes as defined in /server/models/user.go.

Example Request:
```
{
    "Name": "Bob The User",
    "Username": "bob123",
    "Email": "bob@bob.com",
    "Password": "password"
}
```

Example Response (201):
```
{
    "ID": 2347,
    "CreatedAt": "2023-02-23T19:40:04.157-05:00",
    "UpdatedAt": "2023-02-23T19:40:04.157-05:00",
    "DeletedAt": null,
    "Name": "Bob The User",
    "Username": "bob123",
    "Email": "bob@bob.com",
    "Password": "hashedpassword",
    "IsAdmin": false
}
```

#### POST /users/get
The request body should contain the following attributes: ```UserToken``` (string).
The provided ```UserToken``` should be a JWT representing the requested User. The request body should be in the form application/json.
If the user is not found given the provided ```UserToken```, a 404 Not Found status will be sent back.
If any other errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 200 OK status will be sent back along with the User's attributes as defined in /server/models/user.go.

Example Request:
```
{
    "UserToken": "userToken"
}
```

Example Response (200):
```
{
    "ID": 2347,
    "CreatedAt": "2023-02-23T19:40:04.157-05:00",
    "UpdatedAt": "2023-02-23T19:40:04.157-05:00",
    "DeletedAt": null,
    "Name": "Bob The User",
    "Username": "bob123",
    "Email": "bob@bob.com",
    "Password": "hashedpassword",
    "IsAdmin": false
}
```

#### POST /users/login
The request body should contain the following attributes: ```Username``` (string) and ```Password``` (string).
The request body should be sent in the form application/json.
If the user is not found given the ```Username```, a 404 Not Found status will be sent back.
If an error occurs while hashing the password, a 502 Bad Gateway status will be sent back along with a key value pair of "error" and the accompanying error description.
If an error occurs while generating the user's token, a 400 Bad Request status will be sent back along with a key value pair of "error" and the accompanying erro description.
If any other errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 200 OK status will be sent back along with a ```UserToken``` representing the user.

Example Request:
```
{
    "Username": "bob123",
    "Password": "password"
}
```

Example Response (200):
```
{
    "UserToken": "userToken"
}
```

### Character API Endpoints    
#### POST /characters/create    
The request body should contain the following attributes: ```Name``` (string), ```Description``` (string), ```Level``` (uint), ```ClassType``` (uint), and ```OwnerToken``` (string). 
The provided ```OwnerToken``` should be a JWT representing the User the Character should belong to. The request body should be sent in the form application/json.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 201 Created status will be sent back along with the created Character's attributes as defined in /server/models/character.go.

Example Request:
```
{
    "OwnerToken": "adminToken",
    "Name": "Heroic Hero",
    "Description": "A hero amongst heros",
    "Level": 65,
    "ClassType": 0
}
```

Example Response (201):
```
{
    "ID": 7,
    "CreatedAt": "2023-02-23T19:40:04.157-05:00",
    "UpdatedAt": "2023-02-23T19:40:04.157-05:00",
    "DeletedAt": null,
    "Name": "Heroic Hero",
    "Description": "A hero amongst heros",
    "Level": 65,
    "ClassType": 0,
    "Items": {},
    "Spells": {}
}
```

#### POST /characters/get
The request body should contain the following attributes: ```OwnerToken``` (string).
The provided ```OwnerToken``` should be a JWT representing the User for which Characters should be found for. The request body should be sent in the form application/json.
If no Characters for a User are found, a 404 Not Found status will be sent back along with a key value pair of "error" and the User ID of the User who was represented by the JWT.
If any other errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon successful completion of the operation, a 200 OK status will be sent along with a list of Characters and their attributes as defined in /server/models/character.go.

Example Request:
```
{
    "OwnerToken" : "adminToken"
}
```

Example Response (200):
```
{
    {
        "ID": 7,
        "CreatedAt": "2023-02-23T19:40:04.157-05:00",
        "UpdatedAt": "2023-02-23T19:40:04.157-05:00",
        "DeletedAt": null,
        "Name": "Heroic Hero",
        "Description": "A hero amongst heros",
        "Level": 65,
        "ClassType": 0,
        "Items": {},
        "Spells": {}
    },
    ...,
    {
        ...
    }
}
```

#### DELETE /characters/delete
The request body should contain the following attributes: ```OwnerToken``` (string) and ```CharacterID``` (uint).
The provided ```OwnerToken``` should be a JWT representing the User performing the request. The ```CharacterID``` should be a valid ID representing a character. The request body should be sent in the form application/json.
If the provided CharacterID does not reference a valid Character in the database, a 404 Not Found status will be sent back along with a key value pair of "error" and the invalid CharacterID.
If the provided OwnerToken does not represent a User owning the Character (i.e. some other User owns the Character) and the User is not an admin, a 403 Forbidden status will be sent back along with a key value pair of "error" and the invalid User ID.
If any other errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon successful completion of the operation, a 202 Accepted status will be sent back along with the attributes of the deleted character as defined in /sever/models/character.go.

Example Request:
```
{
    "OwnerToken": "adminToken",
    "CharacterID": "characterID"
}
```

Example Response (202):
```
{
    "ID": 7,
    "CreatedAt": "2023-02-23T19:40:04.157-05:00",
    "UpdatedAt": "2023-02-23T19:40:04.157-05:00",
    "DeletedAt": "2023-02-23T20:20:49.527-05:00"l,
    "Name": "Heroic Hero",
    "Description": "A hero amongst heros",
    "Level": 65,
    "ClassType": 0,
    "Items": {},
    "Spells": {}
}
```


### Item API Endpoints   
#### POST /items/create 
Creates and returns the item with a 201 Created status if the user is an admin, otherwise returns a 403 Forbidden status. The user is identified via the token from the request body.  Fails with a 500 status if the user could not be found or unexpected errors ocurred. The ```LevelReq``` and ```ClassReq``` values should correspond to what level and class the character must have before obtaining this item.

Example Request:
```
{
    "AdminToken" : "adminToken",
    "Name" : "Tree branch",
    "Description" : "You can whack people with it",
    "LevelReq" : 2,
    "ClassReq" : 3
}
```

Example Response (201):
```
{
    "ID": 7,
    "CreatedAt": "2023-02-23T19:40:04.157-05:00",
    "UpdatedAt": "2023-02-23T19:40:04.157-05:00",
    "DeletedAt": null,
    "Name": "Tree branch",
    "Description": "You can whack people with it",
    "LevelReq": 2,
    "ClassReq": 3
}
```

#### POST /items/get 
Gets all the items for listing and returns a 200 OK status, or fails with a 500 status if unexpected errors ocurred. Note that currently there is no endpoint to get a single item. The request body should be empty; no admin token is required. 

Example Response (200):
```
[
    {
        "ID": 1,
        "CreatedAt": "2023-02-22T15:46:13.713-05:00",
        "UpdatedAt": "2023-02-22T15:46:13.713-05:00",
        "DeletedAt": null,
        "Name": "Tree branch",
        "Description": "You can whack people with it",
        "LevelReq": 2,
        "ClassReq": 3
    },
    { ... }
]
```

#### POST /items/delete
Deletes the specified item by its ID and returns a 202 Accepted status if the user is an admin, otherwise returns a 403 Forbidden status. The user is identified via the token from the request body. Fails with a 500 status if the user could not be found or unexpected errors ocurred.

Example Request:
```
{
    "AdminToken" : "adminToken",
    "ItemID" : 2
}
```

Example Response (202):
```
{
    "Successfully deleted item": 2
}
```

### Spell API Endpoints   
#### POST /spells/create 
Creates and returns the spell with a 201 Created status if the user is an admin, otherwise returns a 403 Forbidden status. The user is identified via the token from the request body. Fails with a 500 status if the user could not be found or unexpected errors ocurred. The ```LevelReq``` and ```ClassReq``` values should correspond to what level and class the character must have before obtaining this spell.

Example Request:
```
{
    "AdminToken" : "adminToken",
    "Name" : "Magic spell",
    "Description" : "Does some voodoo magic that no one understands",
    "LevelReq" : 1,
    "ClassReq" : 2
}
```

Example Response (201):
```
{
    "ID": 4,
    "CreatedAt": "2023-02-23T19:44:02.418-05:00",
    "UpdatedAt": "2023-02-23T19:44:02.418-05:00",
    "DeletedAt": null,
    "Name": "Magic spell",
    "Description": "Does some voodoo magic that no one understands",
    "LevelReq": 1,
    "ClassReq": 2
}
```

#### POST /spells/get 
Gets all the spells for listing and returns a 200 OK status, or fails with a 500 status if unexpected errors ocurred. Note that currently there is no endpoint to get a single spell. The request body should be empty; no admin token is required. 

Example Response (200):
```
[
    {
        "ID": 1,
        "CreatedAt": "2023-02-22T15:12:24.847-05:00",
        "UpdatedAt": "2023-02-22T15:12:24.847-05:00",
        "DeletedAt": null,
        "Name": "Magic spell",
        "Description": "Does some voodoo magic that no one understands",
        "LevelReq": 1,
        "ClassReq": 2
    },
    { ... } 
]
```

#### POST /spells/delete
Deletes the specified spell by its ID and returns a 202 Accepted status if the user is an admin, otherwise returns a 403 Forbidden status.  The user is identified via the token from the request body.  Fails with a 500 status if the user could not be found or unexpected errors ocurred. 

Example Request:
```
{
    "AdminToken" : "adminToken",
    "SpellID" : 2
}
```

Example Response (202):
```
{
    "Successfully deleted spell": 2
}
```
