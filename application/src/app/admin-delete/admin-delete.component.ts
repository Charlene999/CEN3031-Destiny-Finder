import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
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
  viewItemsSubmitted: Boolean;
  deleteItemSubmitted: Boolean;
  viewSpellsSubmitted: Boolean;
  deleteSpellSubmitted: Boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.itemview = false;
    this.spellview = false;
    this.Itemtext = "Hide All Items"
    this.Spelltext = "Hide All Spells"
    this.allItems = [];
    this.allSpells = [];
    this.viewItemsSubmitted = false;
    this.deleteItemSubmitted = false;
    this.viewSpellsSubmitted = false;
    this.deleteSpellSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null || localStorage.getItem('adminstatus') !== 'true') {
      this.router.navigateByUrl('/');
    }

    // All items and spells should show on page load

    let items = {
      "AdminToken": localStorage.getItem('id_token'),
    };

    let spells = {
      "AdminToken": localStorage.getItem('id_token'),
    };

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/items/get', JSON.stringify(items), options).subscribe(data => {
      if (200) {
        // Show all items or hide them depending on when admin clicks

        this.allItems.splice(0);
        var AllItems = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < AllItems.length; i++) {

          switch (AllItems[i].ClassReq) {
            case 1:
              AllItems[i].ClassReq = "Sorcerer";
              break;
            case 2:
              AllItems[i].ClassReq = "Barbarian";
              break;
            case 3:
              AllItems[i].ClassReq = "Bard";
              break;
            case 4:
              AllItems[i].ClassReq = "Druid";
              break;
            case 5:
              AllItems[i].ClassReq = "Shaman";
              break;
            case 6:
              AllItems[i].ClassReq = "Hunter";
              break;
            case 7:
              AllItems[i].ClassReq = "Necromancer";
              break;
            case 8:
              AllItems[i].ClassReq = "Rogue";
              break;
            case 9:
              AllItems[i].ClassReq = "Paladin";
              break;
            case 10:
              AllItems[i].ClassReq = "Priest";
              break;
            default:
              alert("Invalid class choice.");
              break;
          }

          var item = new Items(AllItems[i].Name, AllItems[i].Description, AllItems[i].LevelReq, AllItems[i].ClassReq, AllItems[i].ID);
          this.allItems.push(item);
        }
        localStorage.setItem('allUserItems', JSON.stringify(this.allItems));

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

    this.http.post('http://localhost:8080/spells/get', JSON.stringify(spells), options).subscribe(data => {
      if (200) {
        // Add all items to table

        this.allSpells.splice(0);
        var AllSpells = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < AllSpells.length; i++) {

          switch (AllSpells[i].ClassReq) {
            case 1:
              AllSpells[i].ClassReq = "Sorcerer";
              break;
            case 2:
              AllSpells[i].ClassReq = "Barbarian";
              break;
            case 3:
              AllSpells[i].ClassReq = "Bard";
              break;
            case 4:
              AllSpells[i].ClassReq = "Druid";
              break;
            case 5:
              AllSpells[i].ClassReq = "Shaman";
              break;
            case 6:
              AllSpells[i].ClassReq = "Hunter";
              break;
            case 7:
              AllSpells[i].ClassReq = "Necromancer";
              break;
            case 8:
              AllSpells[i].ClassReq = "Rogue";
              break;
            case 9:
              AllSpells[i].ClassReq = "Paladin";
              break;
            case 10:
              AllSpells[i].ClassReq = "Priest";
              break;
            default:
              alert("Invalid class choice.");
              break;
          }
          var spell = new Items(AllSpells[i].Name, AllSpells[i].Description, AllSpells[i].LevelReq, AllSpells[i].ClassReq, AllSpells[i].ID);
          this.allSpells.push(spell);
        }
        localStorage.setItem('allUserSpells', JSON.stringify(this.allSpells));

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

  // Allow admin to show and hide ALL items
  viewItems() {
    this.viewItemsSubmitted = true;

    // Hide table if button pressed
    if (document.getElementById('itemTabl')?.style.visibility === "hidden") {
      this.Itemtext = "Hide All Items";
      var tablRow = document.getElementById('itemTabl');
      tablRow!.style.visibility = "visible";
      return;
    }

    else {
      var tablRow = document.getElementById('itemTabl');
      this.Itemtext = "View All Items";
      tablRow!.style.visibility = "hidden";
      return;
    }
  }

  // Allow admin to show and hide spell data
  viewSpells() {

    this.viewSpellsSubmitted = true;
    // Hide table if button pressed
    if (document.getElementById('spellTabl')?.style.visibility === "hidden") {
      this.Spelltext = "Hide All Spells";
      var tablRow = document.getElementById('spellTabl');
      tablRow!.style.visibility = "visible";
      return;
    }

    else {
      var tablRow = document.getElementById('spellTabl');
      this.Spelltext = "View All Spells";
      tablRow!.style.visibility = "hidden";
      return;
    }
  }

  // Delete Item
  deleteItem(id: number, name: string) {

    this.deleteItemSubmitted = true;

    // If admin cancels delete request, it should not delete
    if (!confirm("Are you sure you want to delete item " + name + "?")) {
      alert("Deletion of item " + name + " canceled");
      return;
    }

    // Store admin token and item ID in options to send to delete request
    const opts = {
      headers: { 'Content-Type': 'application/json' }, 
      body: { "ItemID": id, "AdminToken": localStorage.getItem('id_token')!}
    };
    this.http.delete('http://localhost:8080/items/delete', opts).subscribe(data => {

      if (200 || 202 || 204) {

        // Item successfully deleted
        alert("Item " + name + " deleted");
        window.location.reload();
      }
    }, (error) => {
      if (error.status === 404) {
        alert('Item not found.');
      }
      else if (error.status === 409) {
        alert('Item already deleted. Please try to delete another one.');
      }
      else if (error.status === 500) {

        alert('Server down.');
      }
      else if (error.status === 502) {
        alert('Bad gateway.');
      }
    });
  }

  // Delete Spell
  deleteSpell(id: number, name: string) {

    this.deleteSpellSubmitted = true;

    // If admin cancels delete request, it should not delete
    if (!confirm("Are you sure you want to delete spell " + name + "?")) {
      alert("Deletion of spell " + name + " canceled");
      return;
    }

    // Store admin token and item ID in options to send to delete request
    const opts = {
      headers: { 'Content-Type': 'application/json' }, 
      body: { "SpellID": id, "AdminToken": localStorage.getItem('id_token')! }
    };
    this.http.delete('http://localhost:8080/spells/delete', opts).subscribe(data => {

      if (200 || 202 || 204) {

        // Spell successfully deleted
        alert("Spell " + name + " deleted");
        window.location.reload();
      }
    }, (error) => {
      if (error.status === 404) {
        alert('Spell not found.');
      }
      else if (error.status === 409) {
        alert('Spell already deleted. Please try to delete another one.');
      }
      else if (error.status === 500) {

        alert('Server down.');
      }
      else if (error.status === 502) {
        alert('Bad gateway.');
      }
    });
  }

  // Edit Item
  editItem(item: Items, index: number) {

    // Get data admin entered
    var table = document.getElementById("itemTable") as HTMLTableElement;
    var name = table.rows[index + 1]?.cells[0]?.innerText;
    var desc = table.rows[index + 1]?.cells[1]?.innerText;

    let Item =
    {
      "Name": name,
      "Description": desc,
      "ItemID": item.id,
      "AdminToken": localStorage.getItem('id_token')
    }

    // Send request to edit item
    this.http.put("http://localhost:8080/items/update", JSON.stringify(Item)).subscribe(data => {
      if (200) {
        alert("Item " + name+ " successfully updated.");
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
      })
  }

  // Edit Spell
  editSpell(spell: Spells, index: number) {
    // Get data admin entered
    var table = document.getElementById("spellTable") as HTMLTableElement;
    var name = table.rows[index + 1]?.cells[0]?.innerText;
    var desc = table.rows[index + 1]?.cells[1]?.innerText;

    let Spell =
    {
      "Name": name,
      "Description": desc,
      "SpellID": spell.id,
      "AdminToken": localStorage.getItem('id_token')
    }

    // Send request to edit spell
    this.http.put("http://localhost:8080/spells/update", JSON.stringify(Spell)).subscribe(data => {
      if (200) {
        alert("Spell " + name + " successfully updated.");
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
    })
  }
}

class Items {
  name: string;
  description: string;
  levelReq: number;
  classReq: string;
  id: number;

  constructor(Name: string, Description: string, LevelReq: number, ClassReq: string, ID: number) {
    this.name = Name;
    this.description = Description;
    this.levelReq = LevelReq;
    this.classReq = ClassReq;
    this.id = ID;
  }
}

class Spells {
  name: string;
  description: string;
  levelReq: number;
  classReq: string;
  id: number;

  constructor(Name: string, Description: string, LevelReq: number, ClassReq: string, ID: number) {
    this.name = Name;
    this.description = Description;
    this.levelReq = LevelReq;
    this.classReq = ClassReq;
    this.id = ID;
  }
}

