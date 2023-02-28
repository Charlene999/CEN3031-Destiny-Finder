import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})

export class ClassesComponent { 

  constructor(private router:Router){ }

  //If user is not logged in, redirect to home page
  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

}
