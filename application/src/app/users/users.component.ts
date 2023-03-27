import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {

  Name: string;
  Username: string;
  Email: string;

  editNameSubmitted: Boolean;
  editUsernameSubmitted: Boolean;
  editEmailSubmitted: Boolean;
  editPasswordSubmitted: Boolean;

  newCharactersSubmitted: Boolean;
  viewCharactersSubmitted: Boolean;

  form = new FormGroup({  
    website: new FormControl('', Validators.required),
    directions: new FormControl('Select a Profile Field to Update')
  });


  constructor(private http:HttpClient, private router:Router){

    this.Name = "";
    this.Username = "";
    this.Email = "";

    this.editNameSubmitted = false;
    this.editUsernameSubmitted = false; 
    this.editEmailSubmitted = false;
    this.editPasswordSubmitted = false; 

    this.newCharactersSubmitted = false; 
    this.viewCharactersSubmitted = false; 
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }

    let User = {
      "UserToken": localStorage.getItem('id_token')
    }

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/users/get', JSON.stringify(User), options).subscribe((data: any) => {
      if (200) {
        this.Name = data.Name;
        this.Username = data.Username;
        this.Email = data.Email;
      }
    })
  }

  get f(){  
    return this.form.controls;  
  }
    
  submit(){  
    // This item is user update choice dropdown
    const select = document.getElementById("userData") as HTMLSelectElement;
    const index = select.selectedIndex;
    var choice = select.value;
    // Get selected index 
    if (index <= 0)
      return;

    if(choice === 'Update Name') {
      this.editNameSubmitted = true;
      this.router.navigateByUrl("/profile/name");
    }

    if(choice === 'Update Username') {
      this.editUsernameSubmitted = true;
      this.router.navigateByUrl("/profile/username");
    }

    if(choice === 'Update Email') {
      this.editEmailSubmitted = true;
      this.router.navigateByUrl("/profile/email");
    }

    if(choice === 'Update Password') {
      this.editPasswordSubmitted = true;
      this.router.navigateByUrl("/profile/pass");
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
