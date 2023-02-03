import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {

  constructor(private http:HttpClient){ }

  onSubmit(f: NgForm) {
    const options = {headers: {'Content-Type': 'application/json'}};
    this.http.post('http://localhost:8080/users/login', JSON.stringify(f.value), options).subscribe(
      (res: any) => {
        console.log(res);
    });
  }

}
