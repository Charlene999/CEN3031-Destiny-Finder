import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { 

  constructor(private router:Router){ }
  
  loggedIn() {
    if (localStorage.getItem('id_token') === null) {
      return false;
    } else {
      return true;
    }
  }
  
  logout() {
    //alert("Successful logout.");
    //Add functionality to delete JWT Token
    localStorage.removeItem('id_token');
    //Redirect to home page
    this.router.navigateByUrl('/');
  }
 }