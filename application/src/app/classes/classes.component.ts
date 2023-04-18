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
    switch (f) {
      case 1:
        this.firstButtonClicked = true;
        alert("The mighty sorcerer is a master of arcane magic. A sorcerer can cast spells such as fireball and use items like a frost wand.");
        break;
      case 2:
        this.secondButtonClicked = true;
        alert("The fearsome barbarian overpowers enemies with brute force. A barbarian can wound enemies with mortal strike and use items like a spiky club.");
        break;
      case 3:
        this.thirdButtonClicked = true;
        alert("The bard is a crafty minstrel who uses song to turn the tide of battle. A bard can cast cutting words to disarm an enemy and play an instrument, such as a french horn.");
        break;
      case 4:
        this.fourthButtonClicked = true;
        alert("The druid is a mystic who fights with nature's wrath. A druid can cast spells such as plantsport and use items, such as a moon stave.");
        break;
      case 5:
        this.fifthButtonClicked = true;
        alert("The shaman is a master of the four elements. A shaman can blow enemies away with a tornado and wield items, such as an elemental staff.");
        break;
      case 6:
        this.sixthButtonClicked = true;
        alert("The hunter is an exceptional tracker that attacks enemies from afar. A hunter can cast spells such as kill command and use items like a bow and arrow.");
        break;
      case 7:
        this.seventhButtonClicked = true;
        alert("The necromancer is a practitioner of the dark arts. A necromancer can raise the dead from their graves and use items such as a bone septor.");
        break;
      case 8:
        this.eighthButtonClicked = true;
        alert("The rogue skulks in the shadows waiting for the perfect moment to strike an enemy down. A rogue can cast stealth to sneak up on enemies and commonly uses items such as a dagger.");
        break;
      case 9:
        this.ninthButtonClicked = true;
        alert("The paladin is a holy warrior that fights for justice. A paladin can cast spells such as holy light and use items such as a war hammer.");
        break;
      case 10:
        this.tenthButtonClicked = true;
        alert("The priest is a pious individual that uses holy magic to protect allies and disorient enemies. A priest can cast spells such as prayer and use items such as a holy symbol.");
        break;
      default:
        alert("Invalid class choice.");
        break;
    }
  }
}
