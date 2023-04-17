import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent {

  allClasses: Array<string>;
  curClass: string;
  allSpells: Spell[];
  curClassSpells: Spell[];
  viewSubmitted: Boolean;
  searchText: any;

  constructor(private http: HttpClient, private router: Router) {
    this.allClasses = ["All Spells", "Sorcerer", "Barbarian", "Bard", "Druid", "Shaman", "Hunter", "Necromancer", "Rogue", "Paladin", "Priest"];
    this.allSpells = [];
    this.curClass = "All Spells";
    this.curClassSpells = [];
    this.viewSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/spells/get', options).subscribe(data => {
      if (200) {

        if (data === null)
          return;

        var spells = JSON.parse(JSON.stringify(data));

        this.allSpells.splice(0);

        //For all spells in the database
        for (var i = 0; i < spells.length; i++) {

          switch (spells[i].ClassReq) {
            case 1:
              spells[i].ClassReq = "Sorcerer";
              break;
            case 2:
              spells[i].ClassReq = "Barbarian";
              break;
            case 3:
              spells[i].ClassReq = "Bard";
              break;
            case 4:
              spells[i].ClassReq = "Druid";
              break;
            case 5:
              spells[i].ClassReq = "Shaman";
              break;
            case 6:
              spells[i].ClassReq = "Hunter";
              break;
            case 7:
              spells[i].ClassReq = "Necromancer";
              break;
            case 8:
              spells[i].ClassReq = "Rogue";
              break;
            case 9:
              spells[i].ClassReq = "Paladin";
              break;
            case 10:
              spells[i].ClassReq = "Priest";
              break;
            default:
              alert("Invalid class choice.");
              break;
          }
        }
        
        for (var i = 0; i < spells.length; i++) {
          var spell = new Spell(spells[i].Name, spells[i].Description, spells[i].LevelReq, spells[i].ClassReq, spells[i].ID);
          this.allSpells.push(spell);
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

  //Show all spells by class
  showSpells() {

    this.viewSubmitted = true;

    const select = document.getElementById("classes") as HTMLSelectElement;
    const index = select.selectedIndex;

    if(index === 0 || index == -1 || index -1 >= this.allClasses.length)
      return;
    
    this.curClass = this.allClasses.at(index - 1) as string;

    if (this.curClass !== "All Spells") {

      this.curClassSpells.splice(0);

      //For loop that goes through all items in allItems
      for (let item = 0; item < this.allSpells.length; item++) {
        if (this.curClass === this.allSpells[item].Class) {
          //Push item into allItems array
          this.curClassSpells.push(this.allSpells[item]);
        }
      }
    }
  }

  All() {
    if (this.curClass === "All Spells") {
      return true;
    }
    else {
      return false;
    }
  }
}

class Spell {
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
