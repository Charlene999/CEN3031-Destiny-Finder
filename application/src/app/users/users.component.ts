import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {

  constructor(private router:Router){ }
  
  createCharacter() {
    this.router.navigateByUrl("/users/create-character");
  }
}
