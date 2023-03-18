import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  form: FormGroup = new FormGroup({});

  signUpSubmitted: boolean;

  constructor(private fb: FormBuilder, private http:HttpClient, private router:Router){ 
    this.signUpSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') !== null) {
      this.router.navigateByUrl('/');
    }

    //The input form is defined here along with the validators
    this.form = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
      username: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9]*')]),
      email: new FormControl("", [Validators.required, Validators.email,]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20),]),
      //password2: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20),])
    })
  }

  onSubmit() {
    console.log("reactive form submitted");
    console.log(this.form);

    this.signUpSubmitted = true;

    let newUser = {
      name: this.form.controls['name'].value,
      username: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    }

    const options = {headers: {'Content-Type': 'application/json'}};
    this.http.post('http://localhost:8080/users/create', JSON.stringify(newUser), options).subscribe((res: any)=> {
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

  reset() {
    this.form.reset();
  }
}