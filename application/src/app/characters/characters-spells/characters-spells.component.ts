import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters-spells',
  templateUrl: './characters-spells.component.html',
  styleUrls: ['./characters-spells.component.css']
})
export class CharactersSpellsComponent {

  allChars: character[];
  curChar: character;
  allSpells: Spell[];
  viewSubmitted: Boolean;
  addSubmitted: Boolean;
  removeSubmitted: Boolean;
  searchText: any;

  constructor(private http: HttpClient, private router: Router) {
    this.allChars = [];
    this.allSpells = [];
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

        for (var i = 0; i < chars.length; i++) {

          switch (chars[i].ClassType) {
            case 1:
              chars[i].ClassType = "Sorcerer";
              break;
            case 2:
              chars[i].ClassType = "Barbarian";
              break;
            case 3:
              chars[i].ClassType = "Bard";
              break;
            case 4:
              chars[i].ClassType = "Druid";
              break;
            case 5:
              chars[i].ClassType = "Shaman";
              break;
            case 6:
              chars[i].ClassType = "Hunter";
              break;
            case 7:
              chars[i].ClassType = "Necromancer";
              break;
            case 8:
              chars[i].ClassType = "Rogue";
              break;
            case 9:
              chars[i].ClassType = "Paladin";
              break;
            case 10:
              chars[i].ClassType = "Priest";
              break;
            default:
              alert("Invalid class choice.");
              break;
          }

          var char = new character(chars[i].Name, chars[i].Level, chars[i].ClassType, chars[i].Description, chars[i].ID, chars[i].Spells);
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
    }
    );
  }

  // show all spells owned and unowned for that class and level
  showSpells() {

    this.viewSubmitted = true;

    const select = document.getElementById("chars") as HTMLSelectElement;
    const index = select.selectedIndex;

    // Get selected index 
    if (index === 0 || index === -1 || index - 1 >= this.allChars.length)
      return;

    // Current character equals user's selected option'
    var char = this.allChars.at(index - 1)!;

    // this.curChar has to be set here
    this.curChar = char;

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/spells/get', options).subscribe(data => {
      if (200) {

        if (data === null)
          return;

        var spells = JSON.parse(JSON.stringify(data));
        this.allSpells.splice(0);

        for (var i = 0; i < spells.length; i++) {

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
              alert("Invalid class choice.");
              break;
          }

          if (spells[i].ClassReq === compareClass) {
            if (this.levelReqMet(spells[i].LevelReq)) { 
              var spell = new Spell(spells[i].Name, spells[i].Description, spells[i].LevelReq, spells[i].ClassReq, spells[i].ID);
              this.allSpells.push(spell);}
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

  spellOwned(spellID: number): boolean {
    if (this.curChar.spells.get(spellID))
      return true;
    else
      return false;
  }

  levelReqMet(spellLevel: number) {
    if (spellLevel === this.curChar.Level || spellLevel < this.curChar.Level) {
      return true;
    }
    else {
      return false;
    }
  }

  //Add Item To Character
  add(spellId: number) {

    this.addSubmitted = true;

    let addSpell = {
      "SpellID": spellId,
      "OwnerToken": localStorage.getItem('id_token'),
      "CharacterID": this.curChar.ID,
    }

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/addspell', JSON.stringify(addSpell), options).subscribe(data => {
      if (202) {
          alert("Spell added.");
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
  remove(spellID: number) {

    this.removeSubmitted = true;

    const options = { 
      headers: { 'Content-Type': 'application/json' },
      body: {       
        "SpellID": spellID,
        "OwnerToken": localStorage.getItem('id_token'),
        "CharacterID": this.curChar.ID, 
      }
    };
    
    this.http.delete('http://localhost:8080/characters/removespell', options).subscribe(data => {
      if (202) {
          alert("Spell removed.");
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
  spells: Map<number, Spell>;

  constructor(name: string, level: number, myclass: string, desc: string, id: number, allspells: Spell[]) {
    this.Name = name;
    this.Level = level;
    this.Class = myclass;
    this.Description = desc;
    this.ID = id;
    this.spells = new Map<number, Spell>;

    if (allspells !== null) {
      for (var i = 0; i < allspells.length; i++) {
        this.spells.set(allspells[i].ID, allspells[i]);
      }
    }
  }
}

class Spell {
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
