import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  constructor(private http:HttpClient, private router:Router){ }

  ngOnInit() {
    if (localStorage.getItem('id_token') !== null) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(f: NgForm) {
    const options = {headers: {'Content-Type': 'application/json'}};

    this.http.post('http://localhost:8080/users/login', JSON.stringify(f.value), options).subscribe((res: any)=> {
        if (200) {
          //alert("Successful login.");
          //console.log(res.token);
          localStorage.setItem('id_token', res.token);
          //console.log(localStorage.getItem('id_token'));
          //Adds a redirect to localhost:4200//users/get (the user profile page)
          this.router.navigateByUrl('/users/get');
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
