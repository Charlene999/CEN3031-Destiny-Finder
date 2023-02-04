import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})

export class ClassesComponent { 

  constructor(private router:Router){ }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

}
