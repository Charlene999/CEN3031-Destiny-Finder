import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrls: ['./admin-delete.component.css']
})
export class AdminDeleteComponent {

  allItems: Items[];
  allSpells: Spells[];
  Itemtext: string;
  Spelltext: string;
  itemview: boolean;
  spellview: boolean;
  constructor(private http: HttpClient, private router: Router) {
    this.itemview = false;
    this.spellview = false;
    this.Itemtext = "View All Items"
    this.Spelltext = "View All Spells"
    this.allItems = [];
    this.allSpells = [];
  }
  // Allow admin to show and hide ALL items
  ViewItems() {

    let items = {
      "AdminToken": localStorage.getItem('id_token'),
    };

    const options = { headers: { 'Content-Type': 'application/json' } };

    this.http.post('http://localhost:8080/items/get', JSON.stringify(items), options).subscribe(data => {
      if (200) {

        // Show all items or hide them depending on when admin clicks
        if (this.itemview === true) {
          this.allItems.splice(0);
          this.Itemtext = "View All Items";
          this.itemview = false;
        }

        else {
          this.allItems.splice(0);
          var AllItems = JSON.parse(JSON.stringify(data));
          for (let i = 0; i < AllItems.length; i++) {
            var item = new Items(AllItems[i].Name,AllItems[i].Description, AllItems[i].LevelReq, AllItems[i].ClassReq);
            this.allItems.push(item);
          }
          localStorage.setItem('allUserItems', JSON.stringify(this.allItems));
          this.Itemtext = "Hide All Items";
          this.itemview = true;
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

  ViewSpells() {

    let spells = {
      "AdminToken": localStorage.getItem('id_token'),
    };

    const options = { headers: { 'Content-Type': 'application/json' } };

    this.http.post('http://localhost:8080/spells/get', JSON.stringify(spells), options).subscribe(data => {
      if (200) {

        // Show all items or hide them depending on when admin clicks
        if (this.spellview === true) {
          this.allSpells.splice(0);
          this.Spelltext = "View All Spells";
          this.spellview = false;
        }

        else {
          this.allSpells.splice(0);
          var AllSpells = JSON.parse(JSON.stringify(data));
          for (let i = 0; i < AllSpells.length; i++) {
            var spell = new Items(AllSpells[i].Name, AllSpells[i].Description, AllSpells[i].LevelReq, AllSpells[i].ClassReq);
            this.allSpells.push(spell);
          }
          localStorage.setItem('allUserSpells', JSON.stringify(this.allSpells));
          this.Spelltext = "Hide All Spells";
          this.spellview = true;
        }
      }
    }, (error) => {
      if (error.status === 404) {
        alert('Resource not found.');
      }
      else if (error.status === 409) {
        alert('Spell already exists. Please try another one.');
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

  DeleteItem() {

  }

  DeleteSpell() {

  }
}

class Items {
  name: string;
  description: string;
  levelReq: number;
  classReq: number;

  constructor(Name: string, Description: string, LevelReq: number, ClassReq: number) {
    this.name = Name;
    this.description = Description;
    this.levelReq = LevelReq;
    this.classReq = ClassReq;
  }
}

class Spells {
  name: string;
  description: string;
  levelReq: number;
  classReq: number;

  constructor(Name: string, Description: string, LevelReq: number, ClassReq: number) {
    this.name = Name;
    this.description = Description;
    this.levelReq = LevelReq;
    this.classReq = ClassReq;
  }
}

