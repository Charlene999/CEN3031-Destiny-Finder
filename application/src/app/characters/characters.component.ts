import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent { 

  constructor(private router:Router){ }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

}
