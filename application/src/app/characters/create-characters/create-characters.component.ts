import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './create-characters.component.html',
  styleUrls: ['./create-characters.component.css']
})

export class CreateCharactersComponent {

  allClasses: Array<string>;
  allLevels: Array<Number>;
  createSubmitted: Boolean;
  invalidName: string;
  invalidDesc: string;

  constructor(private http: HttpClient, private router: Router) { 
    this.allClasses = ["Sorcerer", "Barbarian", "Bard", "Druid", "Shaman", "Hunter", "Necromancer", "Rogue", "Paladin", "Priest"];
    this.allLevels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    this.createSubmitted = false;
    this.invalidName ="";
    this.invalidDesc ="";
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(f: NgForm) {

    this.createSubmitted = true;

    // if any values are invalid do not send a post request to create character
    if (this.validName(f.value.name) || this.validDescription(f.value.description)) 
      return;

    const selectLevel = document.getElementById("character_dropdown") as HTMLSelectElement;
    let level = selectLevel.options[selectLevel.selectedIndex].value;
    
    const select = document.getElementById("class_dropdown") as HTMLSelectElement;
    let curClass = select.options[select.selectedIndex].value;
    let currentClass = 0;

    switch (curClass) {
      case "Sorcerer":
        currentClass = 1;
        break;
      case "Barbarian":
        currentClass = 2;
        break;
      case "Bard":
        currentClass = 3;
        break;
      case "Druid":
        currentClass = 4;
        break;
      case "Shaman":
        currentClass = 5;
        break;
      case "Hunter":
        currentClass = 6;
        break;
      case "Necromancer":
        currentClass = 7;
        break;
      case "Rogue":
        currentClass = 8;
        break;
      case "Paladin":
        currentClass = 9;
        break;
      case "Priest":
        currentClass = 10;
        break;
      default:
        alert("Invalid class choice.");
        break;
    }

    let Character = {
      "Name": f.value.name,
      "Description": f.value.description,
      "ClassType": currentClass,
      "Level": Number(level),
      "OwnerToken": localStorage.getItem('id_token'),
    };
  
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/create', JSON.stringify(Character),options).subscribe((res: any)=> {
      if (200) {
        alert("Successful character creation.");
        window.location.reload();
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

  // Sets alert to be returned if name is invalid, invalid name returns true (for ngif)
  validName(name: any): boolean {
    if (this.createSubmitted === false)
      return false;

    if (typeof (name) !== 'string') {
      this.invalidName = "Please enter a valid name";
      return true;
    }
    if (name.length === 0) {
      this.invalidName = "Name Required";
      return true;
    }

    if (name.length < 4) {
      this.invalidName = "Name must be at least 4 characters";
      return true
    }

    if (name.length > 20) {
      this.invalidName = "Name can have up to 20 characters";
      return true;
    }

    return false;
  }

  // Sets alert to be returned if description is invalid, invalid description returns true (for ngif)
  validDescription(description: any): boolean {
    if (this.createSubmitted === false)
      return false;

    if (typeof (description) !== 'string') {
      this.invalidDesc = "Please enter a valid description";
      return true;
    }

    if (description.length === 0) {
      this.invalidDesc = "Description Required";
      return true;
    }

    if (description.length < 4) {
      this.invalidDesc = "Description must be at least 4 characters";
      return true;
    }

    if (description.length > 30) {
      this.invalidDesc = "Description can have up to 30 characters";
      return true;
    }

    return false;
  }
}
