import { Component } from '@angular/core';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {
  Users: myUser[];
  text: string;
  view: boolean;
  constructor() {
    this.Users = [];
    this.text = "View All Users";
    this.view = false;
  }

  // 
  ngOnInit() {
  }

  // Allow admin to show and hide characters
  // Temporarily shows current User only, need to update
  View() {
    if (this.view === true) {
      this.text = "View All Users";
      this.view = false;
      this.Users.splice(0);
      return;
    }

    else {
      this.text = "Hide All Users";
      this.view = true;
      var User = JSON.parse(localStorage.getItem('User')!);
      var curUser = new myUser(User.Name, User.Username, User.Email, User.ID, User.IsAdmin);
      this.Users.push(curUser);
      return;
    }
  }
}

// User Info available for admin
class myUser {
  Name: string;
  Username: string;
  Email: string;
  ID: number;
  IsAdmin: boolean;
  adm: string;

  constructor(name: string, username: string, email: string, id: number, isadmin: boolean) {
    this.Name = name;
    this.Username = username;
    this.Email = email;
    this.ID = id;
    this.IsAdmin = isadmin;
    if (isadmin === true) {
      this.adm = "TRUE";
    }

    else {
      this.adm = "FALSE";
    }
  }
}
