import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { 

  hover: boolean;
  constructor(private router: Router) {
    this.hover = false;
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

  // Get user option from select
  profileChoice() {

    var select = document.getElementById("chars") as HTMLSelectElement;
    switch (select.selectedIndex) {
      case 1:
        this.router.navigateByUrl("/profile/create-character");
        break;

      case 2:
        this.router.navigateByUrl("/profile/characters");
        break;

      case 3:
        this.router.navigateByUrl("/profile/spells");
        break;

      case 4:
        this.router.navigateByUrl("/profile/items");
        break;
    }

    select.selectedIndex = 0;
  }

  hovered() {
    console.log("USER HOVERED");
    var option = document.getElementById("opts") as HTMLOptionElement;
    this.hover = true;
    var event;

    option.style.visibility = "visible";
    //select.size = 5;
  }

  unhovered() {
    this.hover = false;

    var select = document.getElementById("chars") as HTMLSelectElement;
    //select.size = 1;
  }

}
