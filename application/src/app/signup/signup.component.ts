import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  constructor(private http:HttpClient){ }

  onSubmit(f: NgForm) {
    const options = {headers: {'Content-Type': 'application/json'}};

    this.http.post('http://localhost:8080/users/create', JSON.stringify(f.value), options).subscribe((res: any)=> {
        if(200) {
          alert("Successful account creation.");
        }
      }, (error) => {
        if (error.status === 404) {
          alert('Resource not found.');
        }
        else if (error.status === 409) {
          alert('Email already exists. Please try another one.');
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
