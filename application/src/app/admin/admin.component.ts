import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  public viewUsersSubmitted: Boolean;
  public addItemsAndSpellsSubmitted: Boolean;
  public removeItemsAndSpellsSubmitted: Boolean;

  constructor(private router:Router){ 
    this.viewUsersSubmitted = false;
    this.addItemsAndSpellsSubmitted = false;
    this.removeItemsAndSpellsSubmitted = false;
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null || localStorage.getItem('adminstatus') !== 'true') {
      this.router.navigateByUrl('/');
    }
  }

  viewUsers() {
    this.viewUsersSubmitted = true;
    this.router.navigateByUrl("/admin/view-users");
  }

  addItemsAndSpells() {
    this.addItemsAndSpellsSubmitted = true;
    this.router.navigateByUrl("/admin/add");
  }

  removeItemsAndSpells() {
    this.removeItemsAndSpellsSubmitted = true;
    this.router.navigateByUrl("/admin/delete");
  }
}
