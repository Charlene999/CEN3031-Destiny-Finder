import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent {

  itemForm: FormGroup = new FormGroup({});
  spellForm: FormGroup = new FormGroup({});
  allClasses: Array<string>;
  allLevels: Array<Number>;

  itemSubmitted: Boolean;
  spellSubmitted: Boolean;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.allClasses = ["Sorcerer", "Barbarian", "Bard", "Druid", "Shaman", "Hunter", "Necromancer", "Rogue", "Paladin", "Priest"];
    this.allLevels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    this.itemSubmitted = false;
    this.spellSubmitted = false;
  }

  ngOnInit() {
    // Route back to home if admin is not logged in
    if (localStorage.getItem('id_token') === null || localStorage.getItem('adminstatus') !== 'true') {
      this.router.navigateByUrl('/');
    }

    this.itemForm = this.fb.group({
      itemname: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
      itemdescription: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z.,? ]*')]),
      //itemlevel: new FormControl("", [Validators.required, Validators.pattern('^(1?[1-9]|10|20)$')]),
      //itemclass: new FormControl("", [Validators.required, Validators.pattern('^([1-9]|10)$')]),
    })

    this.spellForm = this.fb.group({
      spellname: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
      spelldescription: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z.,? ]*')]),
      //spelllevel: new FormControl("", [Validators.required, Validators.pattern('^(1?[1-9]|10|20)$')]),
      //spellclass: new FormControl("", [Validators.required, Validators.pattern('^([1-9]|10)$')]),
    })
  }

  // New Item Submitted
  submitItem() {

    this.itemSubmitted = true;

    const selectLevel = document.getElementById("character_dropdown_item") as HTMLSelectElement;
    let level = selectLevel.options[selectLevel.selectedIndex].value;
    
    const select = document.getElementById("class_dropdown_item") as HTMLSelectElement;
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

    let BuildItem = {
      "AdminToken": localStorage.getItem('id_token'),
      "Name": this.itemForm.controls['itemname'].value,
      "Description": this.itemForm.controls['itemdescription'].value,
      "LevelReq": Number(level),
      "ClassReq": currentClass,
      //"LevelReq": Number(this.itemForm.controls['itemlevel'].value),
      //"ClassReq": Number(this.itemForm.controls['itemclass'].value),
    }

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/items/create', JSON.stringify(BuildItem), options).subscribe((res: any) => {
      if (200) {
        // Show item as created
        alert("Item " + this.itemForm.controls['itemname'].value +  " Successfully Created");
      }
    }, (error) => {
      if (error.status === 404) {
        alert('Resource not found');
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

  // New Spell Submitted
  submitSpell() {

    this.spellSubmitted = true;

    const selectLevel = document.getElementById("character_dropdown_spell") as HTMLSelectElement;
    let level = selectLevel.options[selectLevel.selectedIndex].value;
    
    const select = document.getElementById("class_dropdown_spell") as HTMLSelectElement;
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

    let BuildSpell = {
      "AdminToken": localStorage.getItem('id_token'),
      "Name": this.spellForm.controls['spellname'].value,
      "Description": this.spellForm.controls['spelldescription'].value,
      "LevelReq": Number(level),
      "ClassReq": currentClass,
      //"LevelReq": Number(this.spellForm.controls['spelllevel'].value),
      //"ClassReq": Number(this.spellForm.controls['spellclass'].value),
    }

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/spells/create', JSON.stringify(BuildSpell), options).subscribe((res: any) => {
      if (200) {
        // Show spell as created
        alert("Spell " + this.spellForm.controls['spellname'].value + " Successfully Created");
      }
    }, (error) => {
      if (error.status === 404) {
        alert('Resource not found');
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

  itemreset() {
    this.itemForm.reset();
  }

  spellreset() {
    this.spellForm.reset();
  }
}
