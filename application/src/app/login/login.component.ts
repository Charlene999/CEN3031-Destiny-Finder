import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  loginSubmitted: Boolean;

  constructor(private http:HttpClient, private router:Router) { 
    this.loginSubmitted = false; 
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') !== null) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(f: NgForm) {

    this.loginSubmitted = true;

    const options = { headers: { 'Content-Type': 'application/json' } }; 
    this.http.post('http://localhost:8080/users/login', JSON.stringify(f.value), options).subscribe((res: any)=> {
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