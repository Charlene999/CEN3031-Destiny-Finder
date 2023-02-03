# Sprint 1

## User Stories
We established our project plan at our first Sprint 1 meeting on 01/27/2023.
We created the following 10 user stories:
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
We created issues during both of our Sprint 1 meetings on 01/27/2023 and 02/03/2023.
For the backend, we planned to first set up the MySQL database hosted on AWS and GORM. Then, we planned to set up a basic Go project with Gin while also incorporating the GORM library. Then, we planned to implement a user creation endpoint that would take in a unique username along with an email address, name, and password and store the user in the database. In addition, we also planned to develop a login endpoint, where provided a correct username and password, a JSON web token describing that user would be returned. Afterwards, we planned to implement a get user endpoint that would return details about a user given a JSON web token.

In addition to API endpoints for user management, we planned to develop endpoints for character management. Since characters belong to a user, each of the character API requests would have to be provided a JSON web token identifying the user. The get characters endpoint was planned to take this token and return all of the characters that a user has created. Meanwhile, the create characters endpoint was planned to get the name, level, and description of a character in addition to the token and create a new character for that user.

Meanwhile, for the frontend, <FRONT END INSERT ISSUES HERE>

## Successfully Resolved Issues
For the backend, we were able to complete all of the work we planned for this sprint. 
  
[#10 Create endpoint for logging in](/../../issues/10)
  
[#13 Incorporate GORM into project and set up MySQL database](/../../issues/13)
  
[#15 Create schemas for storing user data and character data](/../../issues/15)
  
[#16 Create endpoint for adding new character](/../../issues/16)
  
[#18 Create endpoint for signing up](/../../issues/18)
  
[#26 Create endpoint for getting all of a user's characters](/../../issues/26)
  
## Unsuccessfully Resolved Issues
