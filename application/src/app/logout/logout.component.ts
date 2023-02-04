import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent {

  constructor(private router:Router){ }
  
  logout() {
    //Add functionality to delete JWT Token
    
    //Redirect to home page
    this.router.navigateByUrl('/');
  }
}
