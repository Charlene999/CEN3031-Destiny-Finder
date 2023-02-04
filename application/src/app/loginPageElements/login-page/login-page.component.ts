import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {

  constructor(private http:HttpClient, private router:Router){ }

  onSubmit(f: NgForm) {
    const options = {headers: {'Content-Type': 'application/json'}};

    this.http.post('http://localhost:8080/users/login', JSON.stringify(f.value), options).subscribe((res: any)=> {
        if (200) {
          alert("Successful login.");
          //console.log(res.token);
          //Adds a redirect to localhost:4200/myprofile (the future user profile page)
          this.router.navigateByUrl('http://localhost:4200/myprofile');
        }
      }, (error) => {
        if (error.status === 404) {
          alert('Resource not found.');
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