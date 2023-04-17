import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})

export class ClassesComponent {

  firstButtonClicked: Boolean;
  secondButtonClicked: Boolean;
  thirdButtonClicked: Boolean;
  fourthButtonClicked: Boolean;
  fifthButtonClicked: Boolean;
  sixthButtonClicked: Boolean;
  seventhButtonClicked: Boolean;
  eighthButtonClicked: Boolean;
  ninthButtonClicked: Boolean;
  tenthButtonClicked: Boolean;

  constructor(private router:Router){ 
    this.firstButtonClicked = false;
    this.secondButtonClicked = false;
    this.thirdButtonClicked = false;
    this.fourthButtonClicked = false;
    this.fifthButtonClicked = false;
    this.sixthButtonClicked = false;
    this.seventhButtonClicked = false;
    this.eighthButtonClicked = false;
    this.ninthButtonClicked = false;
    this.tenthButtonClicked = false;
  }

  //If user is not logged in, redirect to home page
  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

  submit(f: Number) {
    //TODO - Add class information for each class
    //Example: The mighty sorcerer is a master of arcane magic. He can cast spells such as fireball and polymorph.
    switch (f) {
      case 1:
        this.firstButtonClicked = true;
        alert("The mighty sorcerer is a master of arcane magic. He can cast spells such as fireball and polymorph.");
        break;
      case 2:
        this.secondButtonClicked = true;
        alert("Insert class details here ");
        break;
      case 3:
        this.thirdButtonClicked = true;
        alert("Insert class details here ");
        break;
      case 4:
        this.fourthButtonClicked = true;
        alert("Insert class details here ");
        break;
      case 5:
        this.fifthButtonClicked = true;
        alert("Insert class details here ");
        break;
      case 6:
        this.sixthButtonClicked = true;
        alert("Insert class details here ");
        break;
      case 7:
        this.seventhButtonClicked = true;
        alert("Insert class details here ");
        break;
      case 8:
        this.eighthButtonClicked = true;
        alert("Insert class details here ");
        break;
      case 9:
        this.ninthButtonClicked = true;
        alert("Insert class details here ");
        break;
      case 10:
        this.tenthButtonClicked = true;
        alert("Insert class details here ");
        break;
      default:
        alert("Invalid class choice.");
        break;
    }
  }
}
