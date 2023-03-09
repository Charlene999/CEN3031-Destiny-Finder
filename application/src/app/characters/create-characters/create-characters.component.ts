import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  templateUrl: './create-characters.component.html',
  styleUrls: ['./create-characters.component.css']
})

export class CreateCharactersComponent {

  createSubmitted: Boolean;
  
  constructor(private http: HttpClient, private router: Router) { 
    this.createSubmitted = false; 
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(f: NgForm) {

    let Character = {
      "Name": f.value.name,
      "Description": f.value.description,
      "ClassType": Number(f.value.class),
      "Level": Number(f.value.level),
      "OwnerToken": localStorage.getItem('id_token'),
    };

    this.createSubmitted = true;

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/create', JSON.stringify(Character),options).subscribe((res: any)=> {
      if (200) {
        alert("Successful character creation.");
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
