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
The Perfect Path is a Dungeons and Dragons inspired website that one can use customize a character's features and abilities. A user can search for keywords associated with certain spells, hero classes, and so on. Results are filtered based on keyword input. For example, if a user wants to find a certain for a level 5 spellcaster, the user can search for a spell by its name or description and spells that match those filters that their character can equip will be displayed. There is a login page, and the backend and database will store the current user’s customized characters. The database will also be used to store the levels of certain users, and the level of a user will determine what abilities and features are available to that user.

## Getting Started
Frontend is located in application/src.            
Backend is located in application/server.            

### Required Technologies            
Install Node.js and NPM from https://nodejs.org/en/ (Note: NPM is typically included with Node.js).            
Install Go from https://go.dev/dl/.            

### Initial Project Setup            
Run `git clone https://github.com/Charlene999/CEN3031-The-Perfect-Path.git` from a terminal or command line pathed into a designated folder.            
Change directory into the newly created CEN3031-The-Perfect-Path folder/application.             

### Frontend Setup                    
Run `npm install -g @angular/cli`.                
Run `npm install`.                             
Run the frontend using the command `npm start` (Make sure you are within the application directory).            
            
### Backend Setup            
Change directory into server.            
Run `touch .env`.            
Enter the following three lines into the .env file and replace with your chosen SQL database information:            
&emsp;   `DB_USERNAME=replacethiswithdatabaseusername`            
&emsp;   `DB_PASSWORD=replacethiswithdatabasepassword`            
&emsp;   `TOKEN_SECRET=replacethiswithdatabasetokenpassword`            
Copy this .env file into application/server/test in addition to storing it in application/server.          
Run `go mod download`.           
Run the backend using the command `go run main.go` (Make sure you are within the application/server directory).            
Run backend tests using the command `go test backend/test` (Make sure you are within the application/server directory).
