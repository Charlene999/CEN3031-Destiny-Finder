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
  viewSubmitted: Boolean;
  addSubmitted: Boolean;
  removeSubmitted: Boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.allChars = [];
    this.allItems = [];
    this.curChar = {} as character;
    this.viewSubmitted = false;
    this.addSubmitted = false;
    this.removeSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }

    let Character = {
      "OwnerToken": localStorage.getItem('id_token'),
    };

    const options = { headers: { 'Content-Type': 'application/json' } };
    // Get all user characters
    this.http.post('http://localhost:8080/characters/get', JSON.stringify(Character), options).subscribe(data => {
      if (200) {

        if (data === null)
          return;

        console.log(data)
        
        var chars = JSON.parse(JSON.stringify(data));
        this.allChars.splice(0);

        for (var i = 0; i < chars.length; i++) {
          var char = new character(chars[i].Name, chars[i].Level, chars[i].ClassType, chars[i].Description, chars[i].ID, chars[i].Items);
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

  // show all items owned and unowned for that class and level
  showItems() {

    this.viewSubmitted = true;

    const select = document.getElementById("chars") as HTMLSelectElement;
    const index = select.selectedIndex;

    // Get selected index 
    if (index === 0 || index === -1 || index -1 >= this.allChars.length)
      return;

    // Current character equals user's selected option'
    var char = this.allChars.at(index - 1)!;

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
          if (items[i].ClassReq === char.Class) {
            //Create new item object
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
      else if (error.status === 409) {
        alert('Item already exists. Please try another one.');
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

  itemOwned(itemID: number): boolean {
    if (this.curChar.items.get(itemID))
      return true;
    else
      return false;
  }

  setCharacter(char: character) {
    this.curChar = char;
  }

  //Add Item To Character
  add(itemID: number) {

    this.addSubmitted = true;

    let addItem = {
      "ItemID": itemID,
      "OwnerToken": localStorage.getItem('id_token'),
      "CharacterID": this.curChar.ID,
    }

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/additem', JSON.stringify(addItem), options).subscribe(data => {
      if (202) {
          alert("Item added.");
          window.location.reload();
        }
      }, 
      (error) => {
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

  //Add Item To Character
  remove(itemID: number) {

    this.removeSubmitted = true;

    const options = { 
      headers: { 'Content-Type': 'application/json' },
      body: {       
        "ItemID": itemID,
        "OwnerToken": localStorage.getItem('id_token'),
        "CharacterID": this.curChar.ID, 
      }
    };

    this.http.delete('http://localhost:8080/characters/removeitem', options).subscribe(data => {
      if (202) {
          alert("Item removed.");
          window.location.reload();
        }
      }, 
      (error) => {
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

// Character and item schema stored
class character {
  Name: string;
  Level: number;
  Class: number;
  Description: string;
  ID: number;
  items: Map<number, Item>;

  constructor(name: string, level: number, myclass: number, desc: string, id: number, allitems: Item[]) {
    this.Name = name;
    this.Level = level;
    this.Class = myclass;
    this.Description = desc;
    this.ID = id;
    this.items = new Map<number, Item>;

    if (allitems !== null) {
      for (var i = 0; i < allitems.length; i++) {
        this.items.set(allitems[i].ID, allitems[i]);
      }
    }
  }
}

class Item {
  Name: string;
  Description: string;
  Level: number;
  Class: number;
  ID: number;
  Owned: boolean;

  constructor(name: string, desc: string, level: number, myclass: number, id: number) {
    this.Owned = false;
    this.Name = name;
    this.Description = desc;
    this.Level = level;
    this.Class = myclass;
    this.ID = id;
  }
}
