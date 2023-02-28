import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent {

  submitItemSubmitted: Boolean;
  submitSpellSubmitted: Boolean;
  deletePageSubmitted: Boolean;

  constructor(private http: HttpClient, private router: Router) { 
    this.submitItemSubmitted = false;
    this.submitSpellSubmitted = false;
    this.deletePageSubmitted = false;
  }

  // Route back to home if admin is not logged in
  ngOnInit() {
    if (localStorage.getItem('id_token') === null || localStorage.getItem('adminstatus') !== 'true') {
      this.router.navigateByUrl('/');
    }
  }

  // New Item Submitted
  submitItem(f: NgForm) {

    let BuildItem = {
      "AdminToken": localStorage.getItem('id_token'),
      "Name": f.value.name,
      "Description": f.value.description,
      "LevelReq": Number(f.value.level),
      "ClassReq": Number(f.value.class),
    }

    this.submitItemSubmitted = true;

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/items/create', JSON.stringify(BuildItem), options).subscribe((res: any) => {
      if (200) {
        // Show item as created
        alert("Item " + f.value.name +  " Successfully Created");
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
  submitSpell(g: NgForm) {

    let BuildSpell = {
      "AdminToken": localStorage.getItem('id_token'),
      "Name": g.value.name,
      "Description": g.value.description,
      "LevelReq": Number(g.value.level),
      "ClassReq": Number(g.value.class),
    }

    this.submitSpellSubmitted = true;

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/spells/create', JSON.stringify(BuildSpell), options).subscribe((res: any) => {
      if (200) {
        // Show spell as created
        alert("Spell " + g.value.name + " Successfully Created");
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
}
