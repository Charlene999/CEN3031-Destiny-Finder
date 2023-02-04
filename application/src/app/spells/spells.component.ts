import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent { 

  constructor(private router:Router){ }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

}
