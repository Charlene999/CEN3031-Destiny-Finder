import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters-items',
  templateUrl: './characters-items.component.html',
  styleUrls: ['./characters-items.component.css']
})
export class CharactersItemsComponent {

  allChars: character[];
  curChar: character;
  allItems: Item[];
  viewSubmitted: Boolean;
  addSubmitted: Boolean;
  removeSubmitted: Boolean;
  searchText: any;

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
        
        var chars = JSON.parse(JSON.stringify(data));
        this.allChars.splice(0);
        var className ="";
        for (var i = 0; i < chars.length; i++) {

          switch (chars[i].ClassType) {
            case 1:
              className = "Sorcerer";
              break;
            case 2:
              className = "Barbarian";
              break;
            case 3:
              className = "Bard";
              break;
            case 4:
              className = "Druid";
              break;
            case 5:
              className = "Shaman";
              break;
            case 6:
              className = "Hunter";
              break;
            case 7:
              className = "Necromancer";
              break;
            case 8:
              className = "Rogue";
              break;
            case 9:
              className = "Paladin";
              break;
            case 10:
              className = "Priest";
              break;
            default:
              break;
          }

          var char = new character(chars[i].Name, chars[i].Level, className, chars[i].Description, chars[i].ID, chars[i].Items);
          this.allChars.push(char);
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
    });
  }

  // show all items owned and unowned for that class and level
  showItems() {

    this.viewSubmitted = true;

    // Id of select element changed to prevent conflicts
    const select = document.getElementById("itemChars") as HTMLSelectElement;
    var index = select.selectedIndex;

    // Get selected index 
    if (index === 0 || index === -1 || index - 1 >= this.allChars.length) 
      return;

    // Current character equals user's selected option'
    var char = this.allChars.at(index - 1)!;

    // this.curChar has to be set here
    this.curChar = char;
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/items/get', options).subscribe(data => {
      if (200) {

        if (data === null)
          return;

        var items = JSON.parse(JSON.stringify(data));
        
        this.allItems.splice(0);

        //For all items in the database
        for (var i = 0; i < items.length; i++) {

          let compareClass = 0;

          switch (char.Class) {
            case "Sorcerer":
              compareClass = 1;
              break;
            case "Barbarian":
              compareClass = 2;
              break;
            case "Bard":
              compareClass = 3;
              break;
            case "Druid":
              compareClass = 4;
              break;
            case "Shaman":
              compareClass = 5;
              break;
            case "Hunter":
              compareClass = 6;
              break;
            case "Necromancer":
              compareClass = 7;
              break;
            case "Rogue":
              compareClass = 8;
              break;
            case "Paladin":
              compareClass = 9;
              break;
            case "Priest":
              compareClass = 10;
              break;
            default:
              break;
          }

          // Filter items by class that matches current character's class
          if (items[i].ClassReq === compareClass) {
            // Only show item if level requirements are met along with class
            if (this.levelReqMet(items[i].LevelReq)) {
              //Create new item object
              var item = new Item(items[i].Name, items[i].Description, items[i].LevelReq, items[i].ClassReq, items[i].ID);
              //Push item into allItems array
              this.allItems.push(item);
            }
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

  levelReqMet(itemLevel: number) {
    if (itemLevel === this.curChar.Level || itemLevel < this.curChar.Level) {
      return true;
    }
    else {
      return false;
    }
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
  Class: string;
  Description: string;
  ID: number;
  items: Map<number, Item>;

  constructor(name: string, level: number, myclass: string, desc: string, id: number, allitems: Item[]) {
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
  Class: string;
  ID: number;
  Owned: boolean;

  constructor(name: string, desc: string, level: number, myclass: string, id: number) {
    this.Owned = false;
    this.Name = name;
    this.Description = desc;
    this.Level = level;
    this.Class = myclass;
    this.ID = id;
  }
}
