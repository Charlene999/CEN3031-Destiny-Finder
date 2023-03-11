import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent { 
  allChars: character[];
  viewSubmitted: Boolean;

  invalidName: string;
  invalidDesc: string;
  invalidLevel: string;
  invalidClass: string;
  constructor(private http: HttpClient, private router: Router) {
    this.allChars = [];
    this.viewSubmitted = false;
    this.invalidName = "";
    this.invalidDesc = "";
    this.invalidLevel = "";
    this.invalidClass = "";
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }

    this.onLoad()
  }

  onLoad() {
    let Character = {
      "OwnerToken": localStorage.getItem('id_token'),
    };

    this.viewSubmitted = true;

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/get', JSON.stringify(Character), options).subscribe(data => {
      if (200) {

        // All user characters put in a variable for html table access
        this.allChars.splice(0);
        var chars = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < chars.length; i++) {
          var char = new character(chars[i].Name, chars[i].Level, chars[i].Description, chars[i].ClassType,chars[i].ID);
          this.allChars.push(char);
        }
      }
    }, (error) => {
      if (error.status === 404) {
        alert('Resource not found.');
      }
      else if (error.status === 409) {
        alert('Character already exists. Please try another one.');
      }
      else if (error.status === 500) {

        alert('Server down.');
      }
      else if (error.status === 502) {
        alert('Bad gateway.');
      }
    }
    );
  }

  deleteCharacter(name: String, id: number) {
    if (confirm('Are you sure you want to delete character '+ name +'?') === true) {

      // Store admin token and item ID in options to send to delete request
      const opts = {
        headers: { 'Content-Type': 'application/json' }, body: { "CharacterID": id, "OwnerToken": localStorage.getItem('id_token')! }
      };
      this.http.delete('http://localhost:8080/characters/delete', opts).subscribe(data => {

        if (200 || 202 || 204) {
          // Character successfully deleted
          alert("Character " + name + " Deleted");
          window.location.reload();
        }
      }, (error) => {
        if (error.status === 404) {
          alert('Character not found.');
        }
        else if (error.status === 409) {
          alert('Character already deleted. Please try to delete another one.');
        }
        else if (error.status === 500) {

          alert('Server down.');
        }
        else if (error.status === 502) {
          alert('Bad gateway.');
        }
      });
    }
  }

  editCharacter(char: character, index: number) {

    // Get info from html table
    var table = document.getElementById('tabl') as HTMLTableElement;
    var name = table.rows[index+1]?.cells[0]?.innerText;
    var desc = table.rows[index+1]?.cells[1]?.innerText;
    var level = new Number(table.rows[index+1]?.cells[2]?.innerText);
    var myclass = new Number(table.rows[index + 1]?.cells[3]?.innerText);

    var myChar = new character(name, level as number, desc, myclass as number, char.ID);

    if (this.validInfo(myChar) === true)
      return;

    // Create character from edited info according to backend schema
    let Character =
    {
      "Name": name,
	    "Description": desc,
	    "ClassType": myclass,
	    "Level": level,
	    "OwnerToken":  localStorage.getItem('id_token'),
	    "CharacterID": char.ID,
    }

    const options = { headers: { 'Content-Type': 'application/json' } };

    // Confirm if user wants to edit character and edit
    if (confirm("Are you sure you want to edit this character?")) {
      this.http.put('http://localhost:8080/characters/update', JSON.stringify(Character), options).subscribe(data => {
      if (200) {
        // Character should be updated in allChars variable 
        var curChar = JSON.parse(JSON.stringify(data));
        char = new character(curChar.Name, curChar.Level, curChar.Description, curChar.ClassReq, curChar.ID);
        this.allChars[index] = char;

        alert("Character " + char.Name + " Updated");
        window.location.reload;
      }
    }, (error) => {
      if (error.status === 404) {
        alert('Resource not found.');
      }
      else if (error.status === 409) {
        alert('Character already exists. Please try another one.');
      }
      else if (error.status === 500) {
        alert('Server down.');
      }
      else if (error.status === 502) {
        alert('Bad gateway.');
      }
    }
      );
    }
  }

  // Validate character info
  validInfo(char: character): boolean {
    this.validName(char);
    this.validDesc(char);
    this.validLevel(char);
    this.validClass(char);

    // If no invalid data was submitted, character can be updated
    if (this.invalidName !== "" || this.invalidDesc !== "" || this.invalidLevel !== "" || this.invalidClass !== "")
      return true;

    return false;
  }

  validName(char: character) {
    // Name validation
    if (char.Name.length === 0)
      this.invalidName = "Error: Name Required";

    else if (char.Name.length > 0 && char.Name.length < 4)
      this.invalidName = "Error: Name must be at least 4 characters";

    else if (char.Name.length > 50)
      this.invalidName = "Error: Name can have up to 50 characters";
  }

  validDesc(char: character) {
    // Description Validation
    if (char.Description.length === 0)
      this.invalidDesc = "Error: Description Required";

    else if (char.Description.length > 0 && char.Description.length < 4)
      this.invalidDesc = "Error: Description must be at least 4 characters";

    else if (char.Description.length > 250)
      this.invalidDesc = "Error: Description can have up to 250 characters";
  }

  validLevel(char: character) {
    // Level Validation
    if (char.Level <= 0)
      this.invalidLevel = "Error: Level must be greater than 0";

    else if (char.Level > 20)
      this.invalidLevel = "Error: Character can have a maximum level of 20";
  }

  validClass(char: character) {
    // Class Validation
    if (char.Class <= 0)
      this.invalidClass = "Error: Class must be greater than 0";

    else if (char.Class > 20)
      this.invalidClass = "Error: Character can have a maximum class of 20";
  }
}

class character {
  Name: string;
  Level: number;
  Description: string;
  Class: number;
  ID: number;

  constructor(name: string, level: number, desc: string, myClass: number, id: number) {
    this.Name = name;
    this.Level = level;
    this.Description = desc;
    this.Class = myClass;
    this.ID = id;
  }
}
