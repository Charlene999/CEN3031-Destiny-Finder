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
  constructor(private http: HttpClient, private router: Router) { }

  // Route back to home if admin is not logged in
  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

  // New Item Submitted
  submitItem(f: NgForm) {
    const options = { headers: { 'Content-Type': 'application/json' } };

    let BuildItem = 
    {
      "AdminToken": localStorage.getItem('id_token'),
      "Name": f.value.name,
      "Description": f.value.description,
      "LevelReq": Number(f.value.level),
      "ClassReq": Number(f.value.class),
    }
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
  submitSpell(f: NgForm) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    let BuildSpell =
    {
      "AdminToken": localStorage.getItem('id_token'),
      "Name": f.value.name,
      "Description": f.value.description,
      "LevelReq": Number(f.value.level),
      "ClassReq": Number(f.value.class),
    }
    this.http.post('http://localhost:8080/spells/create', JSON.stringify(BuildSpell), options).subscribe((res: any) => {
      if (200) {
        // Show spell as created
        alert("Spell " + f.value.name + " Successfully Created");
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
