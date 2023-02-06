# CEN3031 Software Engineering Group Project

# Project Name - The Perfect Path

## Project Members
### Frontend Engineers            
Charlene Creighton                   
Dylan Tosh             

### Backend Engineers            
Kerry Hannigan             
Connor Wojtak         

## Project Description
The Perfect Path is a Dungeons and Dragons inspired website that one can use customize a character's features and abilities. A user can search for keywords associated with certain spells, hero classes, and so on. Results are filtered based on keyword input. For example, if a user wants to find a high damage ability for a level 5 spellcaster, the user will select high damage from a drop-down bar and results will appear for spells with optional filters for classes or domains and so on. There is a login page, and the backend will store the current user’s customized characters. A database will be used to store the levels of certain users, and the level of a user will determine what abilities and features are available to that user.

## Getting Started
Frontend is located in application/src.            
Backend is located in application/server.            

### Required Technologies            
Install Node.js and NPM from https://nodejs.org/en/ (Note: NPM is typically included with Node.js).            
Install Go from https://go.dev/dl/.            

### Initial Project Setup            
Run `git clone https://github.com/Charlene999/CEN3031-The-Perfect-Path.git` from a terminal or command line pathed into a designated folder.            
Change directory into the newly created CEN3031-The-Perfect-Path folder.            
Run `ng new application`.            
&emsp; 	When it asks, add Angular routing and use CSS.            

### Frontend Setup            
Change directory into application.            
Run `npm install -g @angular/cli`.            
Run the frontend using the command `npm start` (Make sure you are within the application directory).            
            
### Backend Setup            
Change directory into application/server.            
Run `touch .env`.            
Enter the following three lines into the .env file and replace with your chosen SQL database information:            
&emsp;   `DB_USERNAME=replacethiswithdatabaseusername`            
&emsp;   `DB_PASSWORD=replacethiswithdatabasepassword`            
&emsp;   `TOKEN_SECRET=replacethiswithdatabasetokenpassword`            
Run `go get github.com/gin-contrib/cors`.            
Run `go get github.com/gin-gonic/gin`.            
Run `go get github.com/golang-jwt/jwt/v4`.            
Run the backend using the command `go run main.go` (Make sure you are within the application/server directory).            

