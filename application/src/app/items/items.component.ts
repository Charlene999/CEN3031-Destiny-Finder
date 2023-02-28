import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent {

  allChars: character[];
  curChar: character;
  allItems: Item[];

  public viewSubmitted: Boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.allChars = [];
    this.allItems = [];
    this.curChar = {} as character;
    this.viewSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

  characterChoice(Name: string, i: number) {
    //this.curChar = this.allChars.at(i);
    this.allItems = this.allChars[i].items;
  }
  
  onSubmit() {

    let Character = {
      "OwnerToken": localStorage.getItem('id_token'),
    };

    this.viewSubmitted = true;

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/get', JSON.stringify(Character), options).subscribe(data => {
      if (200) {

        if (this.allChars.length === 0) {
          this.allChars = JSON.parse(localStorage.getItem('allUserChars')!);
        }
        
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
  items: Item[];
  constructor(name: string, level: Number, desc: string, id: Number, allitems: Item[]) {

    this.Name = name;
    this.Level = level;
    this.Description = desc;
    this.ID = id;
    this.items = allitems;
  }

}

class Item {
  Name: string;
  Description: string;

  constructor(name: string, desc: string, user: string) {
    this.Name = name;
    this.Description = desc;
  }
}
