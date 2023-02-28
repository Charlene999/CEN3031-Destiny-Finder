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
    //Deletes all adminstatus and id_token cookies
    localStorage.clear();
    //Redirect to home page
    this.router.navigateByUrl('/');
  }

  isAdmin() {
    if (localStorage.getItem('adminstatus') === 'true') {
      return true;
    }
    else {
      return false;
    }
  }
}
