import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent {

  allChars: character[];
  curChar: character;
  allSpells: Spell[];
  viewSubmitted: Boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.allChars = [];
    this.allSpells = [];
    this.curChar = {} as character;
    this.viewSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }

    let Character = {
      "OwnerToken": localStorage.getItem('id_token'),
    };

    this.viewSubmitted = true;

    const options = { headers: { 'Content-Type': 'application/json' } };

    // Get all user characters
    this.http.post('http://localhost:8080/characters/get', JSON.stringify(Character), options).subscribe(data => {
      if (200) {
        if (data === null)
          return;
        var chars = JSON.parse(JSON.stringify(data));
        this.allChars.splice(0);
        for (var i = 0; i < chars.length; i++) {
          var char = new character(chars[i].Name, chars[i].Level, chars[i].ClassType, chars[i].Description, chars[i].CharacterID, chars[i].Items);
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

  // show all spells owned and unowned for that class and level
  showSpells() {

    const select = document.getElementById("chars") as HTMLSelectElement;
    const index = select.selectedIndex;

    // Get selected index 
    if (index === 0 || index === -1 || index - 1 >= this.allChars.length)
      return;

    // Current character equals user's selected option'
    var char = this.allChars.at(index - 1)!;
    // Get all items
    let Spells = {
      "AdminToken": localStorage.getItem('id_token'),
    };

    this.viewSubmitted = true;

    const options = { headers: { 'Content-Type': 'application/json' } };

    this.http.post('http://localhost:8080/spells/get', JSON.stringify(Spells), options).subscribe(data => {
      if (200) {
        var spells = JSON.parse(JSON.stringify(data));
        this.allSpells.splice(0);

        // Filter spells with equal class and level with character

        for (var i = 0; i < spells.length; i++) {

          if (spells[i].LevelReq === char.Level && spells[i].ClassReq === char.Class) {

            var spell = new Spell(spells[i].Name, spells[i].Description, spells[i].LevelReq, spells[i].ClassReq, spells[i].ItemID);

            if (char.spells.get(spell.ID)) {
              spell.Owned = true;
              // If spell belongs to character, Owned should equal true
              char.spells.get(spell.ID)!.Owned = true;
            }
            this.allSpells.push(spell);
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

  // These methods allow items to be shown as owned or unowned by a character
  spellOwned(spell: Spell): boolean {
    return spell.Owned;
  }
  spellUnowned(spell: Spell): boolean {
    if (spell.Owned === false)
      return true;

    else
      return false;
  }

}

// Character and item schema stored
class character {
  Name: string;
  Level: number;
  Class: number;
  Description: string;
  ID: number;
  spells: Map<number, Spell>;
  constructor(name: string, level: number, myclass: number, desc: string, id: number, allspells: Spell[]) {

    this.Name = name;
    this.Level = level;
    this.Class = myclass;
    this.Description = desc;
    this.ID = id;
    this.spells = new Map<number, Spell>;

    if (allspells !== null)
      for (var i = 0; i < allspells.length; i++) {
        this.spells.set(allspells[i].ID, allspells[i]);
      }
  }

}

class Spell {
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

