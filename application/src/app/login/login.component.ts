import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  form: FormGroup = new FormGroup({});
  
  loginSubmitted: Boolean;

  constructor(private fb: FormBuilder, private http:HttpClient, private router:Router) { 
    this.loginSubmitted = false; 
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') !== null) {
      this.router.navigateByUrl('/');
    }

    //The input form is defined here along with the validators
    this.form = this.fb.group({
      username: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9]*')]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20),]),
    })
  }

  onSubmit() {

    this.loginSubmitted = true;

    let existingUser = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    }

    const options = { headers: { 'Content-Type': 'application/json' } }; 
    this.http.post('http://localhost:8080/users/login', JSON.stringify(existingUser), options).subscribe((res: any)=> {
      if (200) {

        let User = {
          "UserToken": res.token
        }
        const options = { headers: { 'Content-Type': 'application/json' } };
        this.http.post('http://localhost:8080/users/get', JSON.stringify(User), options).subscribe((data: any) => {
          if (200) {
            if (data.IsAdmin === true) {
              // Log admin in using token
              localStorage.setItem('id_token', res.token);
              //Set adminstatus to true
              localStorage.setItem('adminstatus', 'true');
              //Adds a redirect to localhost:4200/admin (the admin profile page)
              this.router.navigateByUrl('/admin');
            }
            else {
              // Log user in using token
              localStorage.setItem('id_token', res.token);
              //Adds a redirect to localhost:4200/profile (the user profile page)
              this.router.navigateByUrl('/profile');
            }
          }
        });
      }
      }, (error) => {
        if (error.status === 404) {
          alert('Incorrect username or password.');
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