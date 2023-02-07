# Sprint 1

## User Stories
We created user stories and frontend and backend issues associated with them during our two Sprint 1 meetings on 01/27/2023 and 02/03/2023. These are the user stories we created:

1. As a User, I want to be able to select spells and items so that I can customize my character ([#1](/../../issues/1))
2. As a User, I want to be able to log in so that I can view my profile ([#2](/../../issues/2))
3. As a User, I want to be able to view what spells and items are available at my level of my character and by tags (such as high-damage spells or healing spells) ([#4](/../../issues/4))
4. As a User, I want to search spells and items by tags (such as high-damage spells or healing spells) ([#5](/../../issues/5))
5. As a User, I want to be able to create a character with a name, description, and level so that I can then view and customize them ([#6](/../../issues/6))
6. As an Admin User, I want to be able to add and delete spells and items from the site ([#7](/../../issues/7))
7. As an Admin User, I want to be able to delete users from the site ([#8](/../../issues/8))
8. As a User, I want to be able to change my character's level so that I can access new spells and items ([#9](/../../issues/9))
9. As an Admin User, I want to be able to view all the users on the website so that I can modify them (such as making them admins, etc.) ([#27](/../../issues/27))
10. As a User, I want to be able to view all my characters on one screen so that I can select one to view or customize ([#23](/../../issues/23))

## Issues Planned to Be Addressed

For the backend during Sprint 1, we planned to first set up the MySQL database hosted on AWS and GORM. Then, we planned to set up a basic Go project with Gin while also incorporating the GORM library. Then, we planned to implement a user creation endpoint that would take in a unique username along with an email address, name, and password and store the user in the database. In addition, we also planned to develop a login endpoint, where provided a correct username and password, a JSON web token describing that user would be returned. Afterwards, we planned to implement a get user endpoint that would return details about a user given a JSON web token.

In addition to API endpoints for user management, we planned to develop endpoints for character management. Since characters belong to a user, each of the character API requests would have to be provided a JSON web token identifying the user. The get characters endpoint was planned to take this token and return all of the characters that a user has created. Meanwhile, the create characters endpoint was planned to get the name, level, and description of a character in addition to the token and create a new character for that user.

For the frontend during Sprint 1, we planned to create a sign-up form for new users of the site could enter a name, unique username, email address, and password to register. We also planned to create a login form for existing users to enter their unique username and password to sign in. The goal was to verify the user exists in the database, then a JSON web token identifying the user would be returned and stored in the browser’s cookies. The token would be used to determine what pages a user had access to. We planned that if a user was logged in, they should not see certain pages (like the sign-in page) or if an anonymous user was viewing the site, they should not have access to members only content (like the classes page). In both cases, we planned the user should be redirected to the home page upon attempting to access an unauthorized page or upon successfully logging in or out.

We also planned to create placeholder web pages for items, spells, and classes to establish the routing and basic pages for, but to develop further in future sprints. Our final planning involved how the user profile should be arranged. We planned that it should have the functionality to connect to a user’s character information in the database. We also planned that a user would be able to click on a button to create a new character. The create a new character page was planned to have a form where the user could enter a name, description, and level. Upon submitting the information, the character would be stored under the user’s data within the database, and the user would be redirected to the user profile page. 

## Successfully Resolved Issues
For the backend, we were able to complete all of the work we planned for this sprint. 
  
[#10 Create endpoint for logging in](/../../issues/10)
  
[#13 Incorporate GORM into project and set up MySQL database](/../../issues/13)
  
[#15 Create schemas for storing user data and character data](/../../issues/15)
  
[#16 Create endpoint for adding new character](/../../issues/16)
  
[#18 Create endpoint for signing up](/../../issues/18)
  
[#26 Create endpoint for getting all of a user's characters](/../../issues/26)

For the frontend, we were able to complete most of the work we planned for this sprint.

## Unresolved Issues



## Problems with Resolving Issues
While all of the backend issues planned for this sprint were successfully resolved, some aspects of the implementation may need to be revisited in the future. For example, the get characters and get user API requests are actually currently POST methods as a JSON web token identifying the user currently logged in is contained in the request body. In the future, we may provide the frontend with both a token and a user id to be saved as cookies so that these API endpoint requests may be converted into GET requests that send the user id as a parameter rather than a JSON web token in the body.

The frontend issues planned for this sprint mostly resolved. Towards the end of the sprint, we were having issues with appending the JWT token to the JSON form for creating a new character. We finally resolved the issue, but as a result, the time had run out to finish developing the user profile page.
