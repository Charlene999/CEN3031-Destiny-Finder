import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent {

  allClasses: Array<string>;
  curClass: string;
  allItems: Item[];
  curClassItems: Item[];
  viewSubmitted: Boolean;
  addSubmitted: Boolean;
  removeSubmitted: Boolean;
  searchText: any;

  constructor(private http: HttpClient, private router: Router) {
    this.allClasses = ["All Items", "Sorcerer", "Barbarian", "Bard", "Druid", "Shaman", "Hunter", "Necromancer", "Rogue", "Paladin", "Priest"];
    this.allItems = [];
    this.curClass = "All Items";
    this.curClassItems = [];
    this.viewSubmitted = false;
    this.addSubmitted = false;
    this.removeSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
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

          switch (items[i].ClassReq) {
            case 1:
              items[i].ClassReq = "Sorcerer";
              break;
            case 2:
              items[i].ClassReq = "Barbarian";
              break;
            case 3:
              items[i].ClassReq = "Bard";
              break;
            case 4:
              items[i].ClassReq = "Druid";
              break;
            case 5:
              items[i].ClassReq = "Shaman";
              break;
            case 6:
              items[i].ClassReq = "Hunter";
              break;
            case 7:
              items[i].ClassReq = "Necromancer";
              break;
            case 8:
              items[i].ClassReq = "Rogue";
              break;
            case 9:
              items[i].ClassReq = "Paladin";
              break;
            case 10:
              items[i].ClassReq = "Priest";
              break;
            default:
              alert("Invalid class choice.");
              break;
          }

          var item = new Item(items[i].Name, items[i].Description, items[i].LevelReq, items[i].ClassReq, items[i].ID);
          this.allItems.push(item);
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

  // show all items owned and unowned for that class and level
  showItems() {

    const select = document.getElementById("classes") as HTMLSelectElement;
    const index = select.selectedIndex;

    if(index === 0 || index == -1 || index -1 >= this.allClasses.length)
      return;

    this.viewSubmitted = true;

    this.curClass = this.allClasses.at(index - 1) as string;

    if (this.curClass !== "All Items") {

      this.curClassItems.splice(0);

      //For loop that goes through all items in allItems
      for (let item = 0; item < this.allItems.length; item++) {
        if (this.curClass === this.allItems[item].Class) {
          //Push item into allItems array
          this.curClassItems.push(this.allItems[item]);
        }
      }
    }
  }

  All() {
    if (this.curClass === "All Items") {
      return true;
    }
    else {
      return false;
    }
  }
}

// Item schema stored
class Item {
  Name: string;
  Description: string;
  Level: number;
  Class: string;
  ID: number;

  constructor(name: string, desc: string, level: number, myclass: string, id: number) {
    this.Name = name;
    this.Description = desc;
    this.Level = level;
    this.Class = myclass;
    this.ID = id;
  }
}

