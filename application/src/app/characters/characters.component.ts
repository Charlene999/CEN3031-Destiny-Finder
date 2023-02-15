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
  }

  onSubmit(f: NgForm) {

    let Character = {
      "OwnerToken": localStorage.getItem('id_token'),
    };

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/get', JSON.stringify(Character), options).subscribe(data => {
      if (200) {
        var chars = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < chars.length; i++) {
          var char = new character(chars[i].Name, chars[i].Level, chars[i].Description, chars[i].ID);
          this.allChars.push(char);
          console.log("Character #", i + 1, "\nName: ", char.Name);
        }
        alert("Successful view");
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

}

class character {
  Name: string;
  Level: Number;
  Description: string;
  ID: Number;

  constructor(name: string, level: Number, desc: string, id: Number) {

    this.Name = name;
    this.Level = level;
    this.Description = desc;
    this.ID = id;
  }
}

class userChars {

  allChars: character[];

  constructor(allchars: character[]) {
    this.allChars = allchars;
  }
}
