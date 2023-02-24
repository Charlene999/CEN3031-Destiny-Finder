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
  constructor(private http: HttpClient, private router: Router) {
    this.allChars = [];
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

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/get', JSON.stringify(Character), options).subscribe(data => {
      if (200) {
        // All user characters put in a variable and local storage for user to be able to access
        this.allChars.splice(0);
        var chars = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < chars.length; i++) {
          var char = new character(chars[i].Name, chars[i].Level, chars[i].Description, chars[i].OwnerID, chars[i].ID);
          this.allChars.push(char);
        }
          localStorage.setItem('allUserChars', JSON.stringify(this.allChars));
        //Redirect back to home page to login
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

  deleteCharacter(name: String, desc: String, level: number, id: number) {
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

  editCharacter(name: string, desc: string, level: number, index: number) {
      var ind: number = index;
      this.allChars.at(ind)!.Name = name;
      this.allChars.at(ind)!.Description = desc;
      this.allChars.at(ind)!.Level = level;
  }
}

class character {
  Name: string;
  Level: number;
  Description: string;
  OwnerID: number;
  ID: number;

  constructor(name: string, level: number, desc: string, ownerid: number, id: number) {
    this.Name = name;
    this.Level = level;
    this.Description = desc;
    this.OwnerID = ownerid;
    this.ID = id;
  }
}
