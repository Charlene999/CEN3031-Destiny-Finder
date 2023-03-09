import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent { 

  allChars: character[];
  viewSubmitted: Boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.allChars = [];
    this.viewSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }

    this.onSubmit()
  }

  onSubmit() {

    let Character = {
      "OwnerToken": localStorage.getItem('id_token'),
    };

    this.viewSubmitted = true;

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/get', JSON.stringify(Character), options).subscribe(data => {
      if (200) {
        // All user characters put in a variable and local storage for user to be able to access
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
    var Delete = confirm('Are you sure you want to delete character '+ name +'?');
    if (Delete === true) {

      // Store admin token and item ID in options to send to delete request
      const opts = {
        headers: { 'Content-Type': 'application/json' }, body: { "CharacterID": id, "OwnerToken": localStorage.getItem('id_token')! }
      };
      this.http.delete('http://localhost:8080/characters/delete', opts).subscribe(data => {

        if (200 || 202 || 204) {

          // Item successfully deleted
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

    else
      alert("Character Deletion Canceled")
  }

  editCharacter(char: character, index: number) {

    // Get info from html table
    var table = document.getElementById('tabl') as HTMLTableElement;
    var name = table.rows[index+1]?.cells[0]?.innerText;
    var desc = table.rows[index+1]?.cells[1]?.innerText;
    var level = new Number(table.rows[index+1]?.cells[2]?.innerText);
    var myclass = new Number(table.rows[index + 1]?.cells[3]?.innerText);


    // Create character from edited info
    let Character =
    {
      "Name ": name,
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
        // Character should be updated
        
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

      alert("Character " + char.Name + " Updated");
      window.location.reload;
    }

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
