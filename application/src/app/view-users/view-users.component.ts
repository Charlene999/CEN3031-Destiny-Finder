import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

export class ViewUsersComponent {
  Users: myUser[];
  text: string;
  view: boolean;
  viewUsersSubmitted: Boolean;
  deleteUserSubmitted: Boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.Users = [];
    this.text = "View All Users";
    this.view = false;
    this.viewUsersSubmitted = false;
    this.deleteUserSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null || localStorage.getItem('adminstatus') !== 'true') {
      this.router.navigateByUrl('/');
    }

    this.viewUsers();
  }

  // Allow admin to view all characters
  viewUsers() {

    this.viewUsersSubmitted = true;

    // Post admin variable to get all users
    let Admin = {
      "UserToken": localStorage.getItem('id_token'),
    };
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/users/getall', JSON.stringify(Admin), options).subscribe(data => {

      if (200) {

        // All users in Users variable and stored in table
        this.Users.splice(0);
        var users = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < users.length; i++) {
          var user = new myUser(users[i].Name, users[i].Username, users[i].Email, users[i].ID, users[i].IsAdmin);
          this.Users.push(user);
        }
      }
    }, (error) => {
      if (error.status === 404) {
        alert('Resource not found.');
      }
      else if (error.status === 409) {
        alert('Character already exists. Please try another one.');
      }
      else if (error.status === 500) {

        alert('Server down.');
      }
      else if (error.status === 502) {
        alert('Bad gateway.');
      }
    })
  }

  // Admin can click to delete user (not yet implemented)
  deleteUser(id: number, username: string) {

    this.deleteUserSubmitted = true;

    if (confirm("Are you sure you want to permanently delete this user?")) {
      alert("User " + username + " deleted permanently");
    }
    else {
      alert("User deletion canceled");
    }
  }

  viewHide() {
    if (document.getElementById('tableData')?.style.visibility === "hidden")
    {

      var tablRow = document.getElementById('tableData');
      tablRow!.style.visibility = "visible";
      return;
    }

    else {
      var tablRow = document.getElementById('tableData');
      tablRow!.style.visibility = "hidden";
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
