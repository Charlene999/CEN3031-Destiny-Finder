import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {

  newCharactersSubmitted: Boolean;
  viewCharactersSubmitted: Boolean;

  constructor(private router:Router){ 
    this.newCharactersSubmitted = false; 
    this.viewCharactersSubmitted = false; 
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

  createCharacter() {
    this.newCharactersSubmitted = true;
    this.router.navigateByUrl("/profile/create-character");
  }

  getCharacters() {
    this.viewCharactersSubmitted = true; 
    this.router.navigateByUrl("/profile/characters");
  }
}
