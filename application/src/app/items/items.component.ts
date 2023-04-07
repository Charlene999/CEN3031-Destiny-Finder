import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent {

  allClasses: Array<string>;
  curClass: Number;
  allItems: Item[];
  viewSubmitted: Boolean;
  addSubmitted: Boolean;
  removeSubmitted: Boolean;
  searchText: any;

  constructor(private http: HttpClient, private router: Router) {
    this.allClasses = ["Sorcerer", "Barbarian", "Bard", "Druid", "Shaman", "Hunter", "Necromancer", "Rogue", "Paladin", "Priest"];
    this.allItems = [];
    this.curClass = 0;
    this.viewSubmitted = false;
    this.addSubmitted = false;
    this.removeSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

  // show all items owned and unowned for that class and level
  showItems(f: string) {

    this.viewSubmitted = true;

    switch (f) {
      case "Sorcerer":
        this.curClass = 1;
        break;
      case "Barbarian":
        this.curClass = 2;
        break;
      case "Bard":
        this.curClass = 3;
        break;
      case "Druid":
        this.curClass = 4;
        break;
      case "Shaman":
        this.curClass = 5;
        break;
      case "Hunter":
        this.curClass = 6;
        break;
      case "Necromancer":
        this.curClass = 7;
        break;
      case "Rogue":
        this.curClass = 8;
        break;
      case "Paladin":
        this.curClass = 9;
        break;
      case "Priest":
        this.curClass = 10;
        break;
      default:
        alert("Invalid class choice.");
        break;
    }

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/items/get', options).subscribe(data => {
      if (200) {
        if (data === null)
          return;

        var items = JSON.parse(JSON.stringify(data));
        
        this.allItems.splice(0);

        //For all items in the database
        for (var i = 0; i < items.length; i++) {
          // Filter items by class that matches current character's class
          if (items[i].ClassReq === this.curClass) {
            var item = new Item(items[i].Name, items[i].Description, items[i].LevelReq, items[i].ClassReq, items[i].ID);
            //Push item into allItems array
            this.allItems.push(item);
          }
        }
      }
    }, (error) => {
      if (error.status === 404) {
        alert('Resource not found.');
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

// Item schema stored
class Item {
  Name: string;
  Description: string;
  Level: number;
  Class: number;
  ID: number;

  constructor(name: string, desc: string, level: number, myclass: number, id: number) {
    this.Name = name;
    this.Description = desc;
    this.Level = level;
    this.Class = myclass;
    this.ID = id;
  }
}

