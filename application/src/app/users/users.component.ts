import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {

  constructor(private router:Router){ }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }
  
  createCharacter() {
    this.router.navigateByUrl("/users/create-character");
  }

  getCharacters() {
    this.router.navigateByUrl("/users/characters");
  }
}
