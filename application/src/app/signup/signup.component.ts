import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  signUpSubmitted: Boolean;

  constructor(private http:HttpClient, private router:Router){ 
    this.signUpSubmitted = false; 
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') !== null) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(f: NgForm) {
    this.signUpSubmitted = true;

    //Add validation that password and password2 match before sending httpRequest

    const options = {headers: {'Content-Type': 'application/json'}};
    this.http.post('http://localhost:8080/users/create', JSON.stringify(f.value), options).subscribe((res: any)=> {
        if(201) {
          alert("Successful account creation.");
          //Redirect to user to login page
          this.router.navigateByUrl('/login');
        }
      }, (error) => {
        if (error.status === 404) {
          alert('Resource not found.');
        }
        else if (error.status === 409) {
          alert('Username already exists. Please try another one.');
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
