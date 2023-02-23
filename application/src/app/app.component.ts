import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { 

  constructor(private router: Router) {
  }
  
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
    localStorage.clear();
    //Redirect to home page
    this.router.navigateByUrl('/');
  }

  // Returns true if user is an admin, false if not, called by html
  isAdmin(): boolean{

    if (!this.loggedIn())
      return false;

    var user = JSON.parse(localStorage.getItem('Admin')!);

    if (user === null)
      return false;

    if (user.IsAdmin === true) {
      return true;
    }

    else
      return false;
  }
}
