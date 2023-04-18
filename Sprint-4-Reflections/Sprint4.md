# Sprint 4 Report

## Work Completed
This sprint saw the completion of all the issues/stories for the application. Namely, admin functionality for adding users - including updating, deleting, and getting all users - was implemented. In addition, final touches such as search boxes for various lists, additional text descriptions, population of the database with production data, and minor updates to the UI.

### Frontend Accomplishments
The /classes page has been updated to display 10 buttons whose names are the currently playable classes in the game. When a user clicks one of the buttons, a window alert will pop up that gives a brief description of the class, along with instructions on what number to input on the Create a New Character page to create a character of that class.

The /admin/add-spells-and-items page forms were updated to check for input validation and introduced a reset button to both the add spells and add items form so an admin could easily reset the form if a mistake was made. 

The /admin/view-users page was given functionality this sprint. Upon load, the page will display the information of all users in the database. This information includes the user’s name, username, email, database ID, and admin status. This table has one last column, which is delete user. Clicking on the box in a user’s row will prompt the admin if they are sure they want to delete the user. If the admin clicks ok, the user will be deleted from the database. Finally, by clicking on the View All Users and Hide All Users button, the admin can either view or hide the user information table.

The /spells and /items pages received a complete redesign this sprint. The previous functionality of the /spells and /items pages has been moved to the /profile/spells and /profile/items pages respectively. These pages can be accessed via the new View All Spells By Character and View All Items By Character buttons on the /profile page. The /spells and /items page now prompt a user to select a class from the dropdown box instead of a character. Upon selecting one of ten characters, the tables for both pages will now display the name of the item or spell, its description, and the level required to use it. Additionally, for all 4 pages mentioned above, a new search bar has been added where a user can filter the results by typing in an item or spell’s name, description, or level required. 

A few tests added during Sprints 2 and 3 have been updated to reflect the addition of new features. Many new tests have been added to Cypress and Angular to test the new functionality added during this sprint.

### Backend Accomplishments
In total, three endpoints for the admin functionality were implemented, completing the backend API. The new admin get all users endpoint, admin update user endpoint, and admin delete user endpoint all require an admin account and offer some functionality not available to regular users. In addition to the endpoints themselves, multiple unit tests were added for each endpoint, completing the unit test suite. Finally, the database was populated with production-quality data for demonstration.

### Frontend Cypress E2E Tests

#### Sprints 2 & 3

- Login Page
    - Input Invalid Username and Password - POST Request and Expected Response - Tests that the post response is correct when a user enters invalid credentials to login.
    - Input Invalid Username and Password - Tests that the user is on http://localhost:4200/login, inputs username and password not in database, then clicks button to login.
    - Input Valid Username and Password - Tests that the user is on http://localhost:4200/login, inputs username and password in database, then clicks button to login.

- Home Page
    - Login Button Redirects Correctly - Tests that the user is correctly redirected to the /login page from the home page.
    - Sign Up Button Redirects Correctly - Tests that the user is correctly redirected to the /signup page from the home page.

- Sign Up Page
    - User Already Exists - POST Request and Expected Response - Tests that the post response is correct when a user with matching credentials already exists in the backend.
    - User Already Exists - Tests that the signup attempt is rejected when a user with matching credentials already exists in the backend.

- Profile Page
    - Update Name Option Redirects Correctly - Tests that the user is correctly redirected to the /profile/name page from the /profile page.
    - Update Email Option Redirects Correctly - Tests that the user is correctly redirected to the /profile/email page from the /profile page.
    - Update Password Option Redirects Correctly - Tests that the user is correctly redirected to the /profile/pass page from the /profile page.

- Edit Name Page
    - Successfully Updates Name then Redirects to Profile Page - Tests that the updating name process works, starting from a user logging in to a user changing their password successfully.

- Edit Email Page
    - Successfully Updates Email then Redirects to Profile Page - Tests that the updating email process works, starting from a user logging in to a user changing their password successfully.

- Edit Password Page
    - Successfully Updates Password then Redirects to Profile Page - Tests that the updating password process works, starting from a user logging in to a user changing their password successfully.

#### Sprint 4

#### New Tests

- Sign Up Page
    - New User Successfully Created - Tests that creating a new user via the /signup page works.

- Classes Page
    - Successfully navigate to Classes page from Navbar - Tests that Navbar button for classes successfully redirects to the classes page.

- Spells Page
    - Spells Page Renders with all spells loaded - Tests that the /spells page loads will all spells displayed in the table onInit.
    - Selecting Barbarian From Dropdown Works - Tests that selecting Barbarian from the dropdown will display all Barbarian spells available.

- Items Page
    - Items page renders with all items loaded - Tests that the /items page loads will all items displayed in the table onInit.
    - Selecting Sorcerer From Dropdown Works - Tests that selecting Sorcerer from the dropdown will display all Sorcerer items available.

- Create A New Character Page
    - Successfully Creates a New Character - Tests that creating a new character via the /profile/create-character page works.

- Character Spells Page
    - Successfully add a spell to a character - Tests that adding a spell to an eligible character works.
    - Successfully remove a spell from a character - Tests that removing a spell from an eligible character works.

- Character Items Page 
    - Successfully add an item to a character - Tests that adding an item to an eligible character works.
    - Successfully remove an item from a character - Tests that removing an item from an eligible character works.

- View All Characters Page
    - Successfully Shows All Characters - Tests that the /profile/characters page loads will all characters displayed in the table onInit.
    - Successfully Edit a Character - Tests that editing a character on the /profile/characters page works.
    - Successfully Delete a Character - Tests that deleting a character on the /profile/characters page works.

- Admin Page 
    - View Existing Users Button Redirects Correctly - Tests that the user is correctly redirected to the /admin/view-users page from the /admin page.
    - Create Spells or Items Button Redirects Correctly - Tests that the user is correctly redirected to the /admin/add-spells-and-items page from the /admin page.
    - Remove Spells or Items Redirects Correctly - Tests that the user is correctly redirected to the /admin/delete-spells-and-items page from the /admin page.

- View Existing Users Page
    - Successfully Edit a User - Tests that editing a user on the /admin/view-users page works.
    - Successfully Delete a User - Tests that deleting a user on the /admin/view-users page works.

- Create Spells or Items Page
    - Test Item Reset and Successfully Create Item - Tests that typing in input, reseting it, then typing input again and submitting successfully creates an item on the /admin/add-spells-and-items page.
    - Test Spell Reset and Successfully Create Spell - Tests that typing in input, reseting it, then typing input again and submitting successfully creates an spell on the /admin/add-spells-and-items page.

- Delete Spells or Items Page
    - Successfully Edit an Item - Tests that editing an item on the /admin/delete-spells-and-items page page works.
    - Successfully Delete an Item - Tests that deleting an item on the /admin/delete-spells-and-items page page works.
    - Successfully Edit an Spell - Tests that editing a spell on the /admin/delete-spells-and-items page page works.
    - Successfully Delete a Spell - Tests that deleting a spell on the /admin/delete-spells-and-items page works.

### Frontend Angular Tests

#### Sprints 2 & 3

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
        - Form invalid when empty - Tests that the form is invalid when empty, and therefore cannot be submitted.
        - Username  field validity - Tests that various invalid username inputs are correctly identified invalid.
        - Password field validity - Tests that various invalid password inputs are correctly identified invalid.

- SpellsComponent
    - The /spells page renders - Tests that the page renders successfully.
    - add
        - ADD button works - Tests that the button successfully calls the add function.
    - remove
        - REMOVE button works - Tests that the button successfully calls the remove function.

- UsersComponent
    - The /profile page renders - Tests that the page renders successfully.
    - createCharacter
        - Create A New Character Button Works - Tests that the button successfully calls the createCharacter function.
    - getCharacters
        - View All Characters Button Works - Tests that the button successfully calls the getCharacters function.
    - submit
        - Update Name Option Works - Tests that the option is successfully selected after submit is called and based on the component.form.value.website value.
        - Update Email Option Works - Tests that the option is successfully selected after submit is called and based on the component.form.value.website value.
        - Update Password Option Works - Tests that the option is successfully selected after submit is called and based on the component.form.value.website value.
        
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
    - add
        - ADD button works - Tests that the button successfully calls the add function.
    - remove
        - REMOVE button works - Tests that the button successfully calls the remove function.

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
        - Form invalid when empty - Tests that the form is invalid when empty, and therefore cannot be submitted.
        - Name field validity - Tests that various invalid name inputs are correctly identified invalid.
        - Username  field validity - Tests that various invalid username inputs are correctly identified invalid.
        - Email field validity - Tests that various invalid email inputs are correctly identified invalid.
        - Password field validity - Tests that various invalid password inputs are correctly identified invalid.

- NameComponent
    - The /profile/name page renders - Tests that the page renders successfully.
    - onSubmit
        - Submit Button Works - Tests that the button successfully calls the onSubmit function.
        - Form invalid when empty - Tests that the form is invalid when empty, and therefore cannot be submitted.
        - Name field validity - Tests that various invalid name inputs are correctly identified invalid.
        
- EmailComponent
    - The /profile/email page renders - Tests that the page renders successfully.
    - onSubmit
        - Submit Button Works - Tests that the button successfully calls the onSubmit function.
        - Form invalid when empty - Tests that the form is invalid when empty, and therefore cannot be submitted.
        - Email field validity - Tests that various invalid email inputs are correctly identified invalid.

- PasswordComponent
    - The /profile/pass page renders - Tests that the page renders successfully.
    - onSubmit
        - Submit Button Works - Tests that the button successfully calls the onSubmit function.
        - Form invalid when empty - Tests that the form is invalid when empty, and therefore cannot be submitted.
        - Password field validity - Tests that various invalid password inputs are correctly identified invalid.

#### Sprint 4

#### Removed Tests

- AdminAddComponent
    - submitSpell
        - User Input is Received - Tests that the ngForm data is populated successfully.
        - Reason - AdminAddComponent no longer uses ngForm, so test was removed.
    - submitItem
        - User Input is Received - Tests that the ngForm data is populated successfully.
        - Reason - AdminAddComponent no longer uses ngForm, so test was removed.

- SpellsComponent
    - Reason - Page functionality changed. All tests except /spells page renders moved to CharactersSpellsComponent.

- ItemsComponent
    - Reason - Page functionality changed. All tests except /items page renders moved to CharactersItemsComponent.

- UsersComponent
    - createCharacter
        - Create A New Character Button Works - Tests that the button successfully calls the createCharacter function.
        - Reason - The button has been removed and placed on the Navbar, so the test was removed.
    - getCharacters
        - View All Characters Button Works - Tests that the button successfully calls the getCharacters function.
        - Reason - The button has been removed and placed on the Navbar, so the test was removed.

#### New Tests

- AdminAddComponent
    - submitSpell
        - Form invalid when empty - Tests that the form is invalid when empty, and therefore cannot be submitted.
        - Spell name field validity - Tests that various invalid name inputs are correctly identified invalid.
        - Spell description field validity - Tests that various invalid description inputs are correctly identified invalid.
    - submitItem
        - Form invalid when empty - Tests that the form is invalid when empty, and therefore cannot be submitted.
        - Item name field validity - Tests that various invalid name inputs are correctly identified invalid.
        - Item description field validity - Tests that various invalid description inputs are correctly identified invalid.

- LoginComponent
    - onSubmit
        - Login Button Works - Tests that the button successfully calls the onSubmit() function.

- SpellsComponent
    - Select Dropdown Works - Tests that the dropdown successfully calls the showSpells() function.

- ItemsComponent
    - Select Dropdown Works - Tests that the dropdown successfully calls the showItems() function.

- CharactersItemsComponent
    - The /profile/items page renders - Tests that the page renders successfully.
    - Select Dropdown Works - Tests that the dropdown successfully calls the showItems() function.
    - add
        - ADD button works - Tests that the button successfully calls the add function.
    - remove
        - REMOVE button works - Tests that the button successfully calls the remove function.

- CharactersSpellsComponent
    - The /profile/spells page renders - Tests that the page renders successfully.
    - Select Dropdown Works - Tests that the dropdown successfully calls the showSpells() function.
    - add
        - ADD button works - Tests that the button successfully calls the add function.
    - remove
        - REMOVE button works - Tests that the button successfully calls the remove function.

- ClassesComponent
    - Barbarian Button Works - Tests that the button successfully calls the submit(1) function.
    - Druid Button Works - Tests that the button successfully calls the submit(2) function.
    - Bard Button Works - Tests that the button successfully calls the submit(3) function.
    - Sorcerer Button Works - Tests that the button successfully calls the submit(4) function.
    - Rogue Button Works - Tests that the button successfully calls the submit(5) function.
    - Hunter Button Works - Tests that the button successfully calls the submit(6) function.
    - Priest Button Works - Tests that the button successfully calls the submit(7) function.
    - Necromancer Button Works - Tests that the button successfully calls the submit(8) function.
    - Shaman Button Works - Tests that the button successfully calls the submit(9) function.
    - Paladin Button Works - Tests that the button successfully calls the submit(10) function.

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

- TestUpdateUser_202 - Tests to ensure that users can update themselves as expected.

- TestUpdateUser_500 - Tests to ensure that the update user endpoint can gracefully handle malformed JWTs.

- TestUpdateUser_404 - Tests to ensure that the update user endpoint will gracefully handle a situation in which the provided user token does not represent a user in the database.

- ***New in Sprint 4*** - TestAdminDeleteUser_202 - Tests to ensure that admins can successfully delete users using the delete user endpoint.

- ***New in Sprint 4*** - TestAdminDeleteUser_500 - Tests to ensure that the admin delete user endpoint can gracefully handle a malformed JWT.

- ***New in Sprint 4*** - TestAdminDeleteUser_403 - Tests to ensure that only admins can successfully delete users using the delete user endpoint.

- ***New in Sprint 4*** - TestAdminDeleteUser_404 - Tests to ensure that the admin delete user endpoint can gracefully handle attempts to delete a non-existent user.

- ***New in Sprint 4*** - TestAdminUpdateUser_202 - Tests to ensure that admins can successfully update user information, including the IsAdmin attribute, using the admin update user endpoint.

- ***New in Sprint 4*** - TestAdminUpdateUser_500 - Tests to ensure that the admin update user endpoint can gracefully handle a malformed JWT.

- ***New in Sprint 4*** - TestAdminUpdateUser_404 - Tests to ensure that the admin update user endpoint can gracefully handle attempts to update a non-existent user.

- ***New in Sprint 4*** - TestAdminUpdateUser_403 - Tests to ensure that only admins can successfully update users using the update user endpoint.

- ***New in Sprint 4*** - TestAdminGetAllUsers_200 - Tests to ensure that admins can successfully get all users from the database using the get all users endpoint.

- ***New in Sprint 4*** - TestAdminGetAllUsers_403 - Tests to ensure that only admin can successfully get all users from the get all users endpoint.

- ***New in Sprint 4*** - TestAdminGetAllUsers_500 - Tests to ensure that the admin get all users endpoint can gracefully handle a malformed JWT.

### Character Tests
- TestCreateCharacter_201 - Tests to ensure that a character can be created as expected.

- TestCreateCharacter_400 - Tests to ensure that the create user endpoint can gracefully handle a malformed request.

- TestCreateCharacter_500 - Tests to ensure that the create user endpoint can gracefully handle a malformed JWT.

- TestGetCharacters_200 - Tests to ensure that a user's characters can be obtained as expected.

- TestGetCharacters_500 - Tests to ensure that the get character endpoint can gracefully handle a malformed JWT.

- TestDeleteCharacter_202 - Tests to ensure that a user's character can be deleted as expected.

- TestDeleteCharacter_500 - Tests to ensure that the delete character endpoint can gracefully handle a malformed JWT.

- TestDeleteCharacter_403 - Tests to ensure that non-admin users cannot delete other users' characters.

- TestUpdateCharacter_202 - Tests to ensure that users can update their characters as expected.

- TestUpdateCharacter_403 - Tests to ensure that non-admin users cannot delete other users' characters.

- TestUpdateCharacter_500 - Tests to ensure that the update character endpoint can gracefully handle a malformed JWT.

- TestUpdateCharacter_404 - Tests to ensure that the update character endpoint can gracefully handle a case in which the provided character ID does not exist in the database.

- TestRemoveItemFromCharacter_202 - Tests to ensure that items can be removed from a character as expected.

- TestRemoveItemFromCharacter_403 - Tests to ensure that only the owner of a character or an admin can remove an item from a user's character.

- TestRemoveItemFromCharacter_404 - Tests to ensure that the remove item from character endpoint can gracefully handle cases where the provided character or item is not found in the database.

- TestRemoveItemFromCharacter_500 - Tests to ensure that the remove item from character endpoint can gracefully handle a malformed JWT.

- TestRemoveSpellFromCharacter_202 - Tests to ensure that spells can be removed from a character as expected.

- TestRemoveSpellFromCharacter_403 - Tests to ensure that only the owner of a character or an admin can remove a spell from a user's character.

- TestRemoveSpellFromCharacter_404 - Tests to ensure that the remove spell from character endpoint can gracefully handle cases where the provided character or spell is not found in the database.

- TestRemoveSpellFromCharacter_500 - Tests to ensure that the remove spell from character endpoint can gracefully handle a malformed JWT.

- TestAddSpellToCharacter_202 - Tests to ensure that spells can be added to characters as expected.

- TestAddSpellToCharacter_SpellNotFound - Tests to ensure that the endpoint can gracefully handle a case in which the provided Spell ID does not exist in the database.

- TestAddSpellToCharacter_404_CharacterNotFound - Tests to ensure that the endpoint can gracefully handle a case in which the provided Character ID does not exist in the database.

- TestAddSpellToCharacter_403_NotAdminOrOwner - Tests to ensure than only the character's owner or admins can add spells to a character.

- TestAddSpellToCharacter_403_ClassTypeRequirementNotMet - Tests to ensure that proper error messaging is returned when the selected spell has a ClassReq that is not equal to the character's ClassType. 

- TestAddSpellToCharacter_403_LevelRequirementNotMet - Tests to ensure that proper error messaging is returned when the selected spell has a LevelReq that is not less than or equal to the character's Level. 

- TestAddSpellToCharacter_403_NeitherRequirementMet - Tests to ensure that proper error messaging is returned when the selected spell has a LevelReq that is not less than or equal to the character's Level and a ClassReq that is not equal to the character's ClassType.

- TestAddItemToCharacter_202 - Tests to ensure that items can be added to characters as expected.

- TestAddItemToCharacter_ItemNotFound - Tests to ensure that the endpoint can gracefully handle a case in which the provided Item ID does not exist in the database.

- TestAddItemToCharacter_404_CharacterNotFound - Tests to ensure that the endpoint can gracefully handle a case in which the provided Character ID does not exist in the database.

- TestAddItemToCharacter_403_NotAdminOrOwner - Tests to ensure than only the character's owner or admins can add items to a character.

- TestAddItemToCharacter_403_ClassTypeRequirementNotMet - Tests to ensure that proper error messaging is returned when the selected item has a ClassReq that is not equal to the character's ClassType. 

- TestAddItemToCharacter_403_LevelRequirementNotMet - Tests to ensure that proper error messaging is returned when the selected item has a LevelReq that is not less than or equal to the character's Level. 

- TestAddItemToCharacter_403_NeitherRequirementMet - Tests to ensure that proper error messaging is returned when the selected item has a LevelReq that is not less than or equal to the character's Level and a ClassReq that is not equal to the character's ClassType.

### Item Tests
- TestCreateItem_201 - Tests to ensure that an item can be created as expected.

- TestCreateItem_500 - Tests to ensure that the create item endpoint fails gracefully if the user identified by the token is non-existent.

- TestCreateItem_403 - Tests to ensure that the create item endpoint fails gracefully if the user identified by the token is not an admin.

- TestGetItems_200 - Tests to ensure that all items can be retrieved as expected.

- TestDeleteItem_202 - Tests to ensure that an item can be deleted as expected.

- TestDeleteItem_500 - Tests to ensure that the delete item endpoint fails gracefully if the user identified by the token is non-existent.

- TestDeleteItem_403 - Tests to ensure that the delete item endpoint fails gracefully if the user identified by the token is not an admin.

- TestUpdateItem_202 - Tests to ensure that an item can be updated as expected.

- TestGetFilteredItems_200 - Tests to ensure that items can be filtered by ClassReq and/or LevelReq.

### Spell Tests
- TestCreateSpell_201 - Tests to ensure that a spell can be created as expected.

- TestCreateSpell_500 - Tests to ensure that the create spell endpoint fails gracefully if the user identified by the token is non-existent.

- TestCreateSpell_403 - Tests to ensure that the create spell endpoint fails gracefully if the user identified by the token is not an admin.

- TestGetSpells_200 - Tests to ensure that all spells can be retrieved as expected.

- TestDeleteSpell_202 Tests to ensure that a spell can be deleted as expected.

- TestDeleteSpell_500 - Tests to ensure that the delete spell endpoint fails gracefully if the user identified by the token is non-existent.

- TestDeleteSpell_403 - Tests to ensure that the delete spell endpoint fails gracefully if the user identified by the token is not an admin.

- TestUpdateSpell_202 - Tests to ensure that a spell can be updated as expected.

- TestGetFilteredSpells_200 - Tests to ensure that spells can be filtered by ClassReq and/or LevelReq.

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

#### PUT /users/update
The request body should contain the following attributes: ```UserToken``` (string), ```Name``` (string), ```Email``` (string), and ```Password``` (string).
The provided ```UserToken``` should be a JWT representing the User that should be updated. The request body should be sent in the form application/json.
If a User is not found from the provided ```UserToken```, a 404 Not Found status will be returned. 
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Note that a user's ```Username``` cannot be modified at all and that the ```IsAdmin``` attribute cannot be modified using this endpoint.
Note that if an attribute should remain unchanged, simply do not send that attribute in the request.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the updated User's attributes as defined in /server/models/user.go.

Example Request:
```
{
    "Name": "Billybob",
    "Email": "bob.billy@gmail.com",
    "Password": "a very secure password",
    "UserToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RlciJ9.Bx8FNXdyly-sYAktvvFq9rY0qiQt7bN8j5Kb3ZU_2eI"
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

#### ***New in Sprint 4*** - PUT /users/admin_update
The request body could contain the following attributes: ```AuthToken``` (string), ```Name``` (string), ```Email``` (string), ```Password``` (string), ```IsAdmin``` (string), and ```Username``` (string).
The provided ```AuthToken``` should be a JWT representing the admin User that is performing the request. The provided ```Username``` should represent the user that should be updated. The request body should be sent in the form application/json.
If a User is not found from the provided ```Username```, a 404 Not Found status will be returned. 
If the provided ```AuthToken``` does not have admin privileges,a 403 Forbidden status will be returned.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Note that a user's ```Username``` cannot be modified at all.
However, this endpoint can update the ```IsAdmin``` attribute. Note that ```IsAdmin``` can only be set to true. Once a user becomes an admin, their privileges cannot be removed.
Note that if an attribute should remain unchanged, simply do not send that attribute in the request.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the updated User's attributes as defined in /server/models/user.go.

Example Request:
```
{
    "AuthToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImRlbW8ifQ.nRiyjWEsDY5pGFM2YZETotrkKpf7PaNEQsgWuRJqSxc",
    "Username": "edit",
    "Email": "potato@gmail.com",
    "IsAdmin": true,
    "Name": "AdminUpdateUserTesterSupreme",
    "Password": "new, ultra-secure password"
}
```

Example Response (202):
```
{
    "ID": 40,
    "CreatedAt": "2023-03-29T17:03:07.928-05:00",
    "UpdatedAt": "2023-03-29T17:03:12.325-05:00",
    "DeletedAt": null,
    "Name": "AdminUpdateUserTesterSupreme",
    "Username": "edit",
    "Email": "potato@gmail.com",
    "Password": "<insert hashed password here>",
    "IsAdmin": true
}
```

#### ***New in Sprint 4*** - DELETE /users/delete
The request body should contain the following attributes: ```AuthToken``` (string) and ```Username``` (string).
The provided ```AuthToken``` should be a JWT representing the admin User performing the operation. The request body should be sent in the form application/json. The provided ```Username``` should represent the user to be deleted.
If a User is not found from the provided ```Username```, a 404 Not Found status will be returned. 
If the provided ```AuthToken``` does not have admin privileges,a 403 Forbidden status will be returned.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the deleted User's attributes as defined in /server/models/user.go.

Example Request:
```
{
    "AuthToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RpbmdhZG1pbiJ9.06xPQiaBk0W0IVx6KXcgBMFn_yvSM-6-Dbk4aiuMnOo",
	"Username": "tester9999"
}
```

Example Response (202):
```
{
    "ID": 40,
    "CreatedAt": "2023-03-29T17:03:07.928-05:00",
    "UpdatedAt": "2023-03-29T17:03:12.325-05:00",
    "DeletedAt": null,
    "Name": "Demo User",
    "Username": "tester9999",
    "Email": "potato@gmail.com",
    "Password": "<insert hashed password here>",
    "IsAdmin": true
}
```

#### ***New in Sprint 4*** - POST /users/getall
The request body should contain the following attributes: ```UserToken``` (string).
The provided ```UserToken``` should be a JWT representing the admin that is sending the request. The request body should be in the form application/json.
If the provided ```UserToken``` is not the token of an admin, a 403 Forbidden status will be sent back.
If any other errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 200 OK status will be sent back along with all users attributes as defined in /server/models/user.go.

Example Request:
```
{
    "UserToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ"
}
```

Example Response (200):
```
[
    {
        "ID": 1,
        "CreatedAt": "2023-01-31T13:31:12.491-05:00",
        "UpdatedAt": "2023-01-31T13:31:12.491-05:00",
        "DeletedAt": null,
        "Name": "Kerry Hannigan",
        "Username": "kerrysue",
        "Email": "kerrysue.hannigan@gmail.com",
        "Password": "thisisnotarealpassword213234!",
        "IsAdmin": true
    },
    {
        "ID": 2,
        "CreatedAt": "2023-01-31T14:20:58.944-05:00",
        "UpdatedAt": "2023-01-31T14:20:58.944-05:00",
        "DeletedAt": null,
        "Name": "Testing Pwd Hashing",
        "Username": "tester123",
        "Email": "kerrysue.hannigan@gmail.com",
        "Password": "$2a$10$/vC6oNhyA3QRccojn1cIFO57EdQhx3KQMzXDl1dACHMXnhOS197TS",
        "IsAdmin": true
    },
    { ... }
]
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

#### PUT /characters/update
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

#### DELETE /characters/removeitem
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

#### DELETE /characters/removespell
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

#### POST /characters/additem
The request body should contain the following attributes: ```OwnerToken``` (string), ```CharacterID``` (uint), and ```ItemID``` (uint).
The provided ```OwnerToken``` should be a JWT representing the User performing a request (either the user themselves or an admin).
If the character is not found from the given ```CharacterID```, a 404 Not Found status will be returned.
If the spell is not found from the given ```ItemID```, a 404 Not Found status will be returned.
If the User making the request is not an admin and the provided ```CharacterID``` represents a Character that does not belong to the User represented by the ```OwnerToken```, a 403 Forbidden status will be returned.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the given Item's attributes as defined in /server/models/item.go.

Example Request:
```
{
    "ItemID":4,
    "CharacterID":42,
    "OwnerToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ"
}
```

Example Response (202):
```
{
    "ID": 4,
    "CreatedAt": "2023-02-23T17:38:52.753-05:00",
    "UpdatedAt": "2023-02-23T17:38:52.753-05:00",
    "DeletedAt": null,
    "Name": "Test item",
    "Description": "It's the best item",
    "LevelReq": 2,
    "ClassReq": 5
}
```

#### POST /characters/addspell
The request body should contain the following attributes: ```OwnerToken``` (string), ```CharacterID``` (uint), and ```SpellID``` (uint).
The provided ```OwnerToken``` should be a JWT representing the User performing a request (either the user themselves or an admin).
If the character is not found from the given ```CharacterID```, a 404 Not Found status will be returned.
If the spell is not found from the given ```SpellID```, a 404 Not Found status will be returned.
If the User making the request is not an admin and the provided ```CharacterID``` represents a Character that does not belong to the User represented by the ```OwnerToken```, a 403 Forbidden status will be returned.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the given Spell's attributes as defined in /server/models/spell.go.

Example Request:
```
{
    "SpellID":12,
    "CharacterID":42,
    "OwnerToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ"
}
```

Example Response (202):
```
{
    "ID": 12,
    "CreatedAt": "2023-03-18T19:16:40.94-04:00",
    "UpdatedAt": "2023-03-18T19:16:40.94-04:00",
    "DeletedAt": null,
    "Name": "Test description",
    "Description": "Eeeee",
    "LevelReq": 1,
    "ClassReq": 2
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

#### POST /items/update
The request body should contain an ```AdminToken``` (string), an ```ItemID``` (integer) and any of the following properties to be updated: 
```Name``` (string), ```Description``` (string), ```LevelReq``` (integer), and/or ```ClassReq``` (integer).
The provided ```AdminToken``` should be a JWT representing the Admin performing a request.
If the item is not found from the given ```ItemID```, a 404 Not Found status will be returned.
If the User making the request is not an admin, a 403 Forbidden status will be returned.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the given Item's attributes as defined in /server/models/item.go.

Example Request:
```
{
    "Name":"Tree branch",
    "Description":"You can whack people with it",
    "LevelReq":3,
    "ClassReq":4,
    "ItemID":1,
    "AdminToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ"
}
```

Example Response (202):
```
{
    "ID": 1,
    "CreatedAt": "2023-02-22T15:46:13.713-05:00",
    "UpdatedAt": "2023-03-27T15:38:14.919-04:00",
    "DeletedAt": null,
    "Name": "Tree branch",
    "Description": "You can whack people with it",
    "LevelReq": 3,
    "ClassReq": 4
}
```

#### POST /items/getfiltered
The request body should contain a specified ```ClassReq```, ```LevelReq``` or both for filtering item results. 
The items returned will be of equal or lower ```LevelReq```, and/or of equal ```ClassReq```.
If no items are found, a 404 status will be returned. If any error occurs during the operations a 500 status will be returned. 

Example Request:
```
{
    "ClassReq":5
}
```

Example Response (200):
```
[
    {
        "ID": 4,
        "CreatedAt": "2023-02-23T17:38:52.753-05:00",
        "UpdatedAt": "2023-02-23T17:38:52.753-05:00",
        "DeletedAt": null,
        "Name": "Test item",
        "Description": "It's the best item",
        "LevelReq": 2,
        "ClassReq": 5
    },
    {
        "ID": 5,
        "CreatedAt": "2023-02-23T17:40:22.555-05:00",
        "UpdatedAt": "2023-02-23T17:40:22.555-05:00",
        "DeletedAt": null,
        "Name": "Test item",
        "Description": "It's the best item",
        "LevelReq": 2,
        "ClassReq": 5
    }...
]
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

#### POST /spells/update
The request body should contain an ```AdminToken``` (string), an ```SpellID``` (integer) and any of the following properties to be updated: 
```Name``` (string), ```Description``` (string), ```LevelReq``` (integer), and/or ```ClassReq``` (integer).
The provided ```AdminToken``` should be a JWT representing the Admin performing a request.
If the item is not found from the given ```SpellID```, a 404 Not Found status will be returned.
If the User making the request is not an admin, a 403 Forbidden status will be returned.
If any errors occur during the operation, a 500 Internal Server Error status will be sent back along with a key value pair of "error" and the accompanying error description.
Upon sucessful completion of the operation, a 202 Accepted status will be sent back along with the given Spell's attributes as defined in /server/models/spell.go.

Example Request:
```
{
    "Name":"Magic Spell",
    "LevelReq":7,
    "SpellID":1,
    "AdminToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImtlcnJ5c3VlaCJ9.Zq0UK61gdfrC7LA8Azuw1Y4w857GavixVhocqCmpGUQ"
}
```

Example Response (202):
```
{
    "ID": 1,
    "CreatedAt": "2023-02-22T15:12:24.847-05:00",
    "UpdatedAt": "2023-03-27T15:39:46.229-04:00",
    "DeletedAt": null,
    "Name": "Magic Spell",
    "Description": "Does some voodoo magic that no one understands",
    "LevelReq": 7,
    "ClassReq": 2
}
```

#### POST /spells/getfiltered
The request body should contain a specified ```ClassReq```, ```LevelReq``` or both for filtering spell results. 
The spells returned will be of equal or lower ```LevelReq```, and/or of equal ```ClassReq```.
If no spells are found, a 404 status will be returned. If any error occurs during the operations a 500 status will be returned. 

Example Request:
```
{
    "LevelReq":7
}
```

Example Response (200):
```
[
    {
        "ID": 1,
        "CreatedAt": "2023-02-22T15:12:24.847-05:00",
        "UpdatedAt": "2023-03-27T15:39:46.229-04:00",
        "DeletedAt": null,
        "Name": "Magic Spell",
        "Description": "Does some voodoo magic that no one understands",
        "LevelReq": 7,
        "ClassReq": 2
    },
    {
        "ID": 4,
        "CreatedAt": "2023-02-23T19:44:02.418-05:00",
        "UpdatedAt": "2023-02-23T19:44:02.418-05:00",
        "DeletedAt": null,
        "Name": "Magic spell",
        "Description": "Does some voodoo magic that no one understands",
        "LevelReq": 1,
        "ClassReq": 2
    }...
]
```
