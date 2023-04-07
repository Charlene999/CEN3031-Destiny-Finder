import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent {

  allClasses: Array<string>;
  curClass: Number;
  allSpells: Spell[];
  viewSubmitted: Boolean;
  addSubmitted: Boolean;
  removeSubmitted: Boolean;
  searchText: any;

  constructor(private http: HttpClient, private router: Router) {
    this.allClasses = ["Sorcerer", "Barbarian", "Bard", "Druid", "Shaman", "Hunter", "Necromancer", "Rogue", "Paladin", "Priest"];
    this.allSpells = [];
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

  //Show all spells by class
  showSpells(f: string) {

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
    this.http.post('http://localhost:8080/spells/get', options).subscribe(data => {
      if (200) {
        if (data === null)
          return;

        var spells = JSON.parse(JSON.stringify(data));
        this.allSpells.splice(0);

        for (var i = 0; i < spells.length; i++) {
          if (spells[i].ClassReq === this.curClass) {
            var spell = new Spell(spells[i].Name, spells[i].Description, spells[i].LevelReq, spells[i].ClassReq, spells[i].ID);
            this.allSpells.push(spell);}
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

class Spell {
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
