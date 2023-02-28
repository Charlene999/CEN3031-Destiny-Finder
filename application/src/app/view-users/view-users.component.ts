import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

export class ViewUsersComponent {
  Users: myUser[];
  text: string;
  view: boolean;
  viewCharsSubmitted: Boolean;
  deleteUserSubmitted: Boolean;

  constructor(private router:Router) {
    this.Users = [];
    this.text = "View All Users";
    this.view = false;
    this.viewCharsSubmitted = false;
    this.deleteUserSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null || localStorage.getItem('adminstatus') !== 'true') {
      this.router.navigateByUrl('/');
    }
  }

  // Allow admin to show and hide characters
  // Temporarily shows current User only, need to update
  viewChars() {

    this.viewCharsSubmitted = true;

    if (this.view === true) {
      this.text = "View All Users";
      this.view = false;
      //this.Users.splice(0);
      return;
    }

    else {
      this.text = "Hide All Users";
      this.view = true;
      //var User = JSON.parse(localStorage.getItem('User')!);
      //var Admin = JSON.parse(localStorage.getItem('Admin')!);
      //var curUser = new myUser(User.Name, User.Username, User.Email, Admin.ID, Admin.IsAdmin);
      //this.Users.push(curUser);
      return;
    }
  }

  // Admin can click to delete user
  deleteUser(id: number, username: string) {

    this.deleteUserSubmitted = true;

    if (confirm("Are you sure you want to permanently delete this user?")) {
      alert("User " + username + " deleted permanently");
    }
    else {
      alert("User deletion canceled");
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
