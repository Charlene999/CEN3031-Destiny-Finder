import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent {


  allClasses: Array<string>;
  allChars: character[];
  viewSubmitted: Boolean;

  curClass: string;
  curClassChars: character[];

  CharValid: boolean;
    searchText: any;
  constructor(private http: HttpClient, private router: Router) {
    this.allChars = [];

    this.allClasses = ["All Characters", "Sorcerer", "Barbarian", "Bard", "Druid", "Shaman", "Hunter", "Necromancer", "Rogue", "Paladin", "Priest"];
    this.viewSubmitted = false;
    this.curClass = "All Characters";
    this.curClassChars = [];
    this.CharValid = true;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }

    let Character = {
      "OwnerToken": localStorage.getItem('id_token'),
    };

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/get', JSON.stringify(Character), options).subscribe(data => {
      if (200) {

        // All user characters put in a variable for html table access
        this.allChars.splice(0);
        var chars = JSON.parse(JSON.stringify(data));

        for (let i = 0; i < chars.length; i++) {

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
              //alert("Invalid class choice.");
              break;
          }

          var char = new character(chars[i].Name, chars[i].Level, chars[i].Description, chars[i].ClassType, chars[i].ID);
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

  onLoad() {
    let Character = {
      "OwnerToken": localStorage.getItem('id_token'),
    };

    this.viewSubmitted = true;

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/get', JSON.stringify(Character), options).subscribe(data => {
      if (200) {

        // All user characters put in a variable for html table access
        this.allChars.splice(0);
        var chars = JSON.parse(JSON.stringify(data));

        for (let i = 0; i < chars.length; i++) {

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
              //alert("Invalid class choice.");
              break;
          }

          var char = new character(chars[i].Name, chars[i].Level, chars[i].Description, chars[i].ClassType,chars[i].ID);
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

  deleteCharacter(name: String, id: number) {
    if (confirm('Are you sure you want to delete character '+ name +'?') === true) {

      // Store admin token and item ID in options to send to delete request
      const opts = {
        headers: { 'Content-Type': 'application/json' }, body: { "CharacterID": id, "OwnerToken": localStorage.getItem('id_token')! }
      };
      this.http.delete('http://localhost:8080/characters/delete', opts).subscribe(data => {

        if (200 || 202 || 204) {
          // Character successfully deleted
          alert("Character " + name + " Deleted");
          window.location.reload();
        }
      }, (error) => {
        if (error.status === 404) {
          alert('Character not found.');
        }
        else if (error.status === 409) {
          alert('Character already deleted. Please try to delete another one.');
        }
        else if (error.status === 500) {

          alert('Server down.');
        }
        else if (error.status === 502) {
          alert('Bad gateway.');
        }
      });
    }
  }

  editCharacter(char: character, index: number) {

    // Get info from html table
    var table = document.getElementById('tabl') as HTMLTableElement;
    var name = table.rows[index + 2]?.cells[0]?.innerText;
    var desc = table.rows[index + 2]?.cells[1]?.innerText;
    var level = char.Level;
    var myclass = char.Class;

    // Don't post request if spell data is invalid
    if (!this.charValid(name, desc))
      return;

    console.log(myclass)
    let myclassconvert = 0;

    switch (myclass) {
      case "Sorcerer":
        myclassconvert = 1;
        break;
      case "Barbarian":
        myclassconvert = 2;
        break;
      case "Bard":
        myclassconvert = 3;
        break;
      case "Druid":
        myclassconvert = 4;
        break;
      case "Shaman":
        myclassconvert = 5;
        break;
      case "Hunter":
        myclassconvert = 6;
        break;
      case "Necromancer":
        myclassconvert = 7;
        break;
      case "Rogue":
        myclassconvert = 8;
        break;
      case "Paladin":
        myclassconvert = 9;
        break;
      case "Priest":
        myclassconvert = 10;
        break;
      default:
        break;
    }

    //var myChar = new character(name, level as number, desc, myclass as number, char.ID);
    var myChar = new character(name, level as number, desc, myclass, char.ID);


    // Create character from edited info according to backend schema
    let Character = {
      "Name": name,
	    "Description": desc,
	    "ClassType": parseInt(myclass),
	    "Level": level,
	    "OwnerToken":  localStorage.getItem('id_token'),
	    "CharacterID": char.ID,
    }

    const options = { headers: { 'Content-Type': 'application/json' } };

    // Confirm if user wants to edit character and edit
    if (confirm("Are you sure you want to edit this character?")) {
      this.http.put('http://localhost:8080/characters/update', JSON.stringify(Character), options).subscribe(data => {
      if (200) {
        // Character should be updated in allChars variable 
        var curChar = JSON.parse(JSON.stringify(data));
        
        switch (curChar.ClassType) {
          case 1:
            curChar.ClassReq = "Sorcerer";
            break;
          case 2:
            curChar.ClassReq = "Barbarian";
            break;
          case 3:
            curChar.ClassReq = "Bard";
            break;
          case 4:
            curChar.ClassReq = "Druid";
            break;
          case 5:
            curChar.ClassReq = "Shaman";
            break;
          case 6:
            curChar.ClassReq = "Hunter";
            break;
          case 7:
            curChar.ClassReq = "Necromancer";
            break;
          case 8:
            curChar.ClassReq = "Rogue";
            break;
          case 9:
            curChar.ClassReq = "Paladin";
            break;
          case 10:
            curChar.ClassReq = "Priest";
            break;
          default:
            //alert("Invalid class choice.");
            break;
        }

        char = new character(curChar.Name, curChar.Level, curChar.Description, myclass, curChar.ID);
        this.onLoad();

        alert("Character " + char.Name + " Updated");
        window.location.reload;
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
  }

  showChars() {
    const select = document.getElementById("charClasses") as HTMLSelectElement;
    const index = select.selectedIndex;

    if (index === 0 || index == -1 || index - 1 >= this.allClasses.length)
      return;

    this.viewSubmitted = true;

    this.curClass = this.allClasses.at(index - 1) as string;

    if (this.curClass !== "All Characters") {

      this.curClassChars.splice(0);

      //For loop that goes through all items in allItems
      for (let char = 0; char < this.allChars.length; char++) {
        if (this.curClass === this.allChars[char].Class) {
          //Push item into allItems array
          this.curClassChars.push(this.allChars[char]);
        }
      }
    }
  }

  charValid(charName: string, charDesc: string): boolean {

    // Validate edit character with add character validation
    var charname = "", chardesc = "";
    var valChar = document.getElementById("charValid") as HTMLTableRowElement;
    var descVal = new RegExp('[a-zA-Z.,? ]*');

    if (!descVal.test(charDesc))
      chardesc = "Description contains invalid characters"

    if (charDesc.length < 4)
      chardesc = "Description must be at least 4 characters"

    if (charDesc.length > 100)
      chardesc = "Description cannot exceed 100 characters"

    var nameVal = new RegExp('[a-zA-Z ]*');

    if (!nameVal.test(charName))
      charname = "Name contains invalid characters"

    if (charName.length < 4)
      charname = "Name must be at least 4 characters"

    if (charName.length > 30)
      charname = "Name cannot exceed 30 characters"

    if (charname == "" && chardesc == "") {
      valChar.innerHTML = "";
      this.CharValid = true;
      return this.CharValid;
    }
    valChar.innerHTML = charname + "<br>" + chardesc;
    this.CharValid = false;
    return this.CharValid;
  }

  All() {
    if (this.curClass === "All Characters") {
      return true;
    }
    else {
      return false;
    }
  }
}

class character {
  Name: string;
  Level: number;
  Description: string;
  Class: string;
  ID: number;

  constructor(name: string, level: number, desc: string, myClass: string, id: number) {
    this.Name = name;
    this.Level = level;
    this.Description = desc;
    this.Class = myClass;
    this.ID = id;
  }
}
