# Sprint 3 Report

## Work Completed
This sprint saw the completion of allowing for the updating of character and user information, the ability for users to browse through spells and items that match their character's level and class, and the ability for users to add/remove those spells and items to/from their characters.

### Frontend Accomplishments

### Backend Accomplishments
Update user and update character endpoints were added to allow for users to update their information and their characters' information. In addition, update item and update spell endpoints were added to allow for admins to update information about items and spells users can choose from.     
Furthermore, four endpoints were added for adding/removing items/spells to/from characters. This means that the backend interactions between users, characters, items, and spells are now overall complete.       
Multiple unit tests were written to test each of the developed endpoints. In order to accomodate all of the tests, the main_test.go test file was broken into multiple files and grouped into a testing package under application/server/test.

## Frontend Cypress and Unit Tests

### Cypress Tests

#### E2E Tests

- Input Invalid Username and Password - Tests that the user is on http://localhost:4200/login, inputs username and password not in database, then clicks button to login.

- Input Valid Username and Password - Tests that the user is on http://localhost:4200/login, inputs username and password in database, then clicks button to login.

#### Frontend Tests

- ItemsComponent
    - mounts - Tests that the page renders successfully.

### Angular Tests

- AppComponent
    - The home page (/) renders - Tests that the page renders successfully.

- AdminAddComponent
    - The /admin/add-spells-and-items page renders - Tests that the page renders successfully.
    - submitSpell
        - Add Spell Button Works - Tests that the button successfully calls the submitSpell function.
        - User Input is Received - Tests that the ngForm data is populated successfully.
    - submitItem
        - Add Item Button Works - Tests that the button successfully calls the submitItem function.
        - User Input is Received - Tests that the ngForm data is populated successfully.

- LoginComponent
    - The /login page renders - Tests that the page renders successfully.
    - onSubmit
        - Login Button Works - Tests that the button successfully calls the onSubmit function.
        - User Input is Received - Tests that the ngForm data is populated successfully.

- SpellsComponent
    - The /spells page renders - Tests that the page renders successfully.

- UsersComponent
    - The /profile page renders - Tests that the page renders successfully.
    - createCharacter
        - Create A New Character Button Works - Tests that the button successfully calls the createCharacter function.
    - getCharacters
        - View All Characters Button Works - Tests that the button successfully calls the getCharacters function.
    
- CharactersComponent
    - The /profile/characters page renders - Tests that the page renders successfully.

- AdminDeleteComponent
    - The /admin/delete-spells-and-items page renders - Tests that the page renders successfully.
    - viewItems
        - View Items Button Works - Tests that the button successfully calls the viewItems function.
    - deleteSpell
        - Delete Spell Button Works - Tests that the button successfully calls the deleteSpell function.
    - deleteItem
        - Delete Item Button Works - Tests that the button successfully calls the deleteItem function.
    - viewSpells
        - View Spells Button Works - Tests that the button successfully calls the viewSpells function.

- CreateCharactersComponent
    - The /profile/create-character page renders - Tests that the page renders successfully.
    - onSubmit
        - User Input is Received - Tests that the ngForm data is populated successfully.
        - Submit Button Works - Tests that the button successfully calls the onSubmit function.
    
- ItemsComponent
    - The /items page renders - Tests that the page renders successfully.
    - onSubmit
        - View Your Items Button Works - Tests that the button successfully calls the onSubmit function.

- AdminComponent
    - The /admin page renders - Tests that the page renders successfully.
    - viewUsers
        - View Existing Users Button Works - Tests that the button successfully calls the viewUsers function.
    - addItemsAndSpells
        - Create Spells or Items Button Works - Tests that the button successfully calls the addItemsAndSpells function.
    - removeItemsAndSpells
        - Remove Spells or Items Button Works - Tests that the button successfully calls the removeItemsAndSpells function.

- ViewUsersComponent
    - The /admin/view-users page renders - Tests that the page renders successfully.
    - viewChars
        - View Characters Button Works - Tests that the button successfully calls the viewChars function.
    - deleteUser
        - Delete User Button Works - Tests that the button successfully calls the deleteUser function.
    
- ClassesComponent
    - The /classes page renders - Tests that the page renders successfully.

- SignupComponent
    - The /signup page renders - Tests that the page renders successfully.
    - onSubmit
        - Submit Button Works - Tests that the button successfully calls the onSubmit function.
        - User Input is Received - Tests that the ngForm data is populated successfully.

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

- TestLogin_502 - Tests to ensure that the login endpoint will reject an invalid username/password combination.

- **Added in Sprint 3** - TestUpdateUser_202 - Tests to ensure that users can update themselves as expected.

- **Added in Sprint 3** - TestUpdateUser_500 - Tests to ensure that the update user endpoint can gracefully handle malformed JWTs.

- **Added in Sprint 3** - TestUpdateUser_502 - Tests to ensure that the update user endpoint will reject an invalid current password before allowing for a user to be updated.

- **Added in Sprint 3** - TestUpdateUser_404 - Tests to ensure that the update user endpoint will gracefully handle a situation in which the provided username does not represent a user in the database.

### Character Tests
- TestCreateCharacter_201 - Tests to ensure that a character can be created as expected.

- TestCreateCharacter_400 - Tests to ensure that the create user endpoint can gracefully handle a malformed request.

- TestCreateCharacter_500 - Tests to ensure that the create user endpoint can gracefully handle a malformed JWT.

- TestGetCharacters_200 - Tests to ensure that a user's characters can be obtained as expected.

- TestGetCharacters_500 - Tests to ensure that the get character endpoint can gracefully handle a malformed JWT.

- TestDeleteCharacter_202 - Tests to ensure that a user's character can be deleted as expected.

- TestDeleteCharacter_500 - Tests to ensure that the delete character endpoint can gracefully handle a malformed JWT.

- TestDeleteCharacter_403 - Tests to ensure that non-admin users cannot delete other users' characters.

- **Added in Sprint 3** - TestUpdateCharacter_202 - Tests to ensure that users can update their characters as expected.

- **Added in Sprint 3** - TestUpdateCharacter_403 - Tests to ensure that non-admin users cannot delete other users' characters.

- **Added in Sprint 3** - TestUpdateCharacter_500 - Tests to ensure that the update character endpoint can gracefully handle a malformed JWT.

- **Added in Sprint 3** - TestUpdateCharacter_404 - Tests to ensure that the update character endpoint can gracefully handle a case in which the provided character ID does not exist in the database.

- **Added in Sprint 3** - TestRemoveItemFromCharacter_202 - Tests to ensure that items can be removed from a character as expected.

- **Added in Sprint 3** - TestRemoveItemFromCharacter_403 - Tests to ensure that only the owner of a character or an admin can remove an item from a user's character.

- **Added in Sprint 3** - TestRemoveItemFromCharacter_404 - Tests to ensure that the remove item from character endpoint can gracefully handle cases where the provided character or item is not found in the database.

- **Added in Sprint 3** - TestRemoveItemFromCharacter_500 - Tests to ensure that the remove item from character endpoint can gracefully handle a malformed JWT.

- **Added in Sprint 3** - TestRemoveSpellFromCharacter_202 - Tests to ensure that spells can be removed from a character as expected.

- **Added in Sprint 3** - TestRemoveSpellFromCharacter_403 - Tests to ensure that only the owner of a character or an admin can remove a spell from a user's character.

- **Added in Sprint 3** - TestRemoveSpellFromCharacter_404 - Tests to ensure that the remove spell from character endpoint can gracefully handle cases where the provided character or spell is not found in the database.

- **Added in Sprint 3** - TestRemoveSpellFromCharacter_500 - Tests to ensure that the remove spell from character endpoint can gracefully handle a malformed JWT.

- **Added in Sprint 3** - TestAddSpellToCharacter_202 - Tests to ensure that spells can be added to characters as expected.

- **Added in Sprint 3** - TestAddSpellToCharacter_SpellNotFound - Tests to ensure that the endpoint can gracefully handle a case in which the provided Spell ID does not exist in the database.

- **Added in Sprint 3** - TestAddSpellToCharacter_404_CharacterNotFound - Tests to ensure that the endpoint can gracefully handle a case in which the provided Character ID does not exist in the database.

- **Added in Sprint 3** - TestAddSpellToCharacter_403_NotAdminOrOwner - Tests to ensure than only the character's owner or admins can add spells to a character.

- **Added in Sprint 3** - TestAddSpellToCharacter_403_ClassTypeRequirementNotMet - Tests to ensure that proper error messaging is returned when the selected spell has a ClassReq that is not equal to the character's ClassType. 

- **Added in Sprint 3** - TestAddSpellToCharacter_403_LevelRequirementNotMet - Tests to ensure that proper error messaging is returned when the selected spell has a LevelReq that is not less than or equal to the character's Level. 

- **Added in Sprint 3** - TestAddSpellToCharacter_403_NeitherRequirementMet - Tests to ensure that proper error messaging is returned when the selected spell has a LevelReq that is not less than or equal to the character's Level and a ClassReq that is not equal to the character's ClassType.

- **Added in Sprint 3** - TestAddItemToCharacter_202 - Tests to ensure that items can be added to characters as expected.

- **Added in Sprint 3** - TestAddItemToCharacter_ItemNotFound - Tests to ensure that the endpoint can gracefully handle a case in which the provided Item ID does not exist in the database.

- **Added in Sprint 3** - TestAddItemToCharacter_404_CharacterNotFound - Tests to ensure that the endpoint can gracefully handle a case in which the provided Character ID does not exist in the database.

- **Added in Sprint 3** - TestAddItemToCharacter_403_NotAdminOrOwner - Tests to ensure than only the character's owner or admins can add items to a character.

- **Added in Sprint 3** - TestAddItemToCharacter_403_ClassTypeRequirementNotMet - Tests to ensure that proper error messaging is returned when the selected item has a ClassReq that is not equal to the character's ClassType. 

- **Added in Sprint 3** - TestAddItemToCharacter_403_LevelRequirementNotMet - Tests to ensure that proper error messaging is returned when the selected item has a LevelReq that is not less than or equal to the character's Level. 

- **Added in Sprint 3** - TestAddItemToCharacter_403_NeitherRequirementMet - Tests to ensure that proper error messaging is returned when the selected item has a LevelReq that is not less than or equal to the character's Level and a ClassReq that is not equal to the character's ClassType.

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
Endpoints have been grouped by whether they manage Users, Characters, Items, or Spells.  

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

#### **New in Sprint 3** - PUT /users/update
The request body should contain the following attributes: ```AuthToken``` (string), ```Username``` (string), ```Name``` (string), ```Email``` (string), ```CurrentPassword``` (string), ```Password``` (string), and ```IsAdmin``` (bool).
The provided ```AuthToken``` should be a JWT representing the User performing a request (either the user themselves or an admin). The provided ```Username``` should represent the User that should be updated. The request body should be sent in the form application/json.
If either the User making the request or the User to be updated is not found in the database, a 404 Not Found status will be returned. 
If the User making the request is not an admin and the hash of ```CurrentPassword``` does not match the User's current password, a 502 Bad Gateway status will be returned.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Note that the ```IsAdmin``` attribute will be updated if the AuthToken represents an administrator; however, checking if the AuthToken is an admin will be implemented in Sprint 4 with the rest of the admin functionality, meaning this attribute cannot yet be modified.
Note that a user's ```Username``` cannot be modified.
Note that if an attribute should remain unchanged, send "" or -1 for strings and integers, respectively.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the updated User's attributes as defined in /server/models/user.go.

Example Request:
```
{
    "Name": "Billybob",
    "Email": "bob.billy@gmail.com",
    "CurrentPassword": "a very, very secure password",
    "Password": "password",
    "AuthToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RlciJ9.Bx8FNXdyly-sYAktvvFq9rY0qiQt7bN8j5Kb3ZU_2eI",
    "Username": "tester"
}
```

Example Response (202):
```
{
    "ID": 27,
    "CreatedAt": "2023-02-23T19:40:04.157-05:00",
    "UpdatedAt": "2023-03-04T17:44:41.872-05:00",
    "DeletedAt": null,
    "Name": "Billybob",
    "Username": "tester",
    "Email": "bob.billy@gmail.com",
    "Password": "hashedpassword",
    "IsAdmin": false
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

#### **New in Sprint 3** - PUT /characters/update
The request body should contain the following attributes: ```OwnerToken``` (string), ```Description``` (string), ```Name``` (string), ```ClassType``` (int), ```Level``` (int), and ```CharacterID``` (uint).
The provided ```OwnerToken``` should be a JWT representing the User performing a request (either the user themselves or an admin).
If the character is not found from the given ```CharacterID```, a 404 Not Found status will be returned.
If the User making the request is not an admin and the provided ```CharacterID``` represents a Character that does not belong to the User represented by the ```OwnerToken```, a 403 Forbidden status will be returned.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Note that any attributes that shouldn't change should not be included in the request.
Note that if the ```Level``` or ```ClassType``` is changed, any items that are incompatible with the character's new class or level will automatically be "unlinked" from the character.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the updated Character's attributes as defined in /server/models/character.go.

Example Request:
```
{
    "Name": "Test Hero - Updated Version",
    "Description": "The most heroic hero of all the heroic heroes in all of testing land!!!",
    "Level": 999,
    "ClassType": 10,
    "OwnerToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo",
    "CharacterId": 4
}
```

Example Response (202):
```
{
    "ID": 4,
    "CreatedAt": "2023-03-03T19:40:04.157-05:00",
    "UpdatedAt": "2023-03-04T21:12:11.251-05:00",
    "DeletedAt": null,
    "Name": "Test Hero - Updated Version",
    "Description": "The most heroic hero of all the heroic heroes in all of testing land!!!",
    "Level": 999,
    "ClassType": 10,
    "Items": {},
    "Spells": {}
}
```

#### **New in Sprint 3** - DELETE /characters/removeitem
The request body should contain the following attributes: ```OwnerToken``` (string), ```ItemId``` (uint), and ```CharacterID``` (uint).
The provided ```OwnerToken``` should be a JWT representing the User performing a request (either the user themselves or an admin).
If the character is not found from the given ```CharacterID```, a 404 Not Found status will be returned.
If the item is not found from the given ```ItemID```, a 404 Not Found status will be returned.
If the User making the request is not an admin and the provided ```CharacterID``` represents a Character that does not belong to the User represented by the ```OwnerToken```, a 403 Forbidden status will be returned.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the given Item's attributes as defined in /server/models/item.go.
Note that the operation does not delete the provided item from the database; instead, it "unlinks" it from the provided character.

Example Request:
```
{
    "OwnerToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo",
	"CharacterId": 4,
	"ItemId": 17
}
```

Example Response (202):
```
{
    "ID": 17,
    "CreatedAt": "2023-03-10T09:04:10.947-06:00",
    "UpdatedAt": "2023-03-10T09:04:10.947-06:00",
    "DeletedAt": null,
    "Name": "Rock",
    "Description": "Completely useless.",
    "LevelReq": 99,
    "ClassReq": 0
}
```

#### **New in Sprint 3** - DELETE /characters/removespell
The request body should contain the following attributes: ```OwnerToken``` (string), ```SpellId``` (uint), and ```CharacterID``` (uint).
The provided ```OwnerToken``` should be a JWT representing the User performing a request (either the user themselves or an admin).
If the character is not found from the given ```CharacterID```, a 404 Not Found status will be returned.
If the spell is not found from the given ```SpellID```, a 404 Not Found status will be returned.
If the User making the request is not an admin and the provided ```CharacterID``` represents a Character that does not belong to the User represented by the ```OwnerToken```, a 403 Forbidden status will be returned.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the given Spell's attributes as defined in /server/models/spell.go.
Note that the operation does not delete the provided spell from the database; instead, it "unlinks" it from the provided character.

Example Request:
```
{
    "OwnerToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo",
	"CharacterId": 4,
	"SpellId": 14
}
```

Example Response (202):
```
{
    "ID": 14,
    "CreatedAt": "2023-03-10T09:12:39.409-06:00",
    "UpdatedAt": "2023-03-10T09:12:39.409-06:00",
    "DeletedAt": null,
    "Name": "Magic Missile",
    "Description": "Shoot a missile that has a 100% chance of killing the target upon a successful hit but has a 0% chance of hitting.",
    "LevelReq": 1,
    "ClassReq": 5
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
