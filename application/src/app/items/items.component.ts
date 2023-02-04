import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent { 

  constructor(private router:Router){ }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }
  
}
