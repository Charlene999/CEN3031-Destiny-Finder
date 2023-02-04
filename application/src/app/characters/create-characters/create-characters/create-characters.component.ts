import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-characters.component.html',
  styleUrls: ['./create-characters.component.css']
})

export class CreateCharactersComponent {

  constructor(private router:Router){ }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(f: NgForm) {

    /*TODO - Add functionality to tie this character form to user account

    const options = {headers: {'Content-Type': 'application/json'}};

    this.http.post('http://localhost:8080/users/create', JSON.stringify(f.value), options).subscribe((res: any)=> {
        if(200) {
          alert("Successful account creation.");
          //Redirect back to home page to login
          this.router.navigateByUrl('http://localhost:4200/');
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
    */
  }
}
