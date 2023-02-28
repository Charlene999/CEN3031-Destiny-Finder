import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  public loginSubmitted: Boolean;

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
            // Store user info and if they are admin or not in local storage
            //var admin = new adM(userInf.ID, userInf.IsAdmin);
            //var user = new myUser(userInf.Name, userInf.Username, userInf.Email);
            //localStorage.setItem('User', JSON.stringify(user));
            //localStorage.setItem('Admin', JSON.stringify(admin));
            if (data.IsAdmin === true) {
              // Log user in using token
              localStorage.setItem('id_token', res.token);
              localStorage.setItem('adminstatus', 'true');
              this.router.navigateByUrl('/admin/get');
            }
            else {
              // Log user in using token
              localStorage.setItem('id_token', res.token);
              //Adds a redirect to localhost:4200//users/get (the user profile page)
              this.router.navigateByUrl('/users/get');
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

// Stores if user is admin or not
class adM {
  ID: number;
  IsAdmin: boolean;

  constructor(iD: number, isAdmin: boolean) {
    this.ID = iD;
    this.IsAdmin = isAdmin;
  }
}

// Stores necessary user info
class myUser {
  Name: string;
  Username: string;
  Email: string;

  constructor(name: string, username: string, email: string) {

    this.Name = name;
    this.Username = username;
    this.Email = email;
  }
}
