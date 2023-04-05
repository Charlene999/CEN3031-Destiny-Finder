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

  submit(f: Number) {
    //TODO - Add class information for each class
    //Example: The mighty sorcerer is a master of arcane magic. He can cast spells such as fireball and polymorph.
    switch (f) {
      case 1:
        alert("The mighty sorcerer is a master of arcane magic. He can cast spells such as fireball and polymorph." + 
        "\n\nIf you are interested in creating a character with this class:" +
        "\n\nInput 1 for Character Class on the Create a New Character page.");
        break;
      case 2:
        alert("Insert class details here " + 
        "\n\nIf you are interested in creating a character with this class:" +
        "\n\nInput 2 for Character Class on the Create a New Character page.");
        break;
      case 3:
        alert("Insert class details here " + 
        "\n\nIf you are interested in creating a character with this class:" +
        "\n\nInput 3 for Character Class on the Create a New Character page.");
        break;
      case 4:
        alert("Insert class details here " + 
        "\n\nIf you are interested in creating a character with this class:" +
        "\n\nInput 4 for Character Class on the Create a New Character page.");
        break;
      case 5:
        alert("Insert class details here " + 
        "\n\nIf you are interested in creating a character with this class:" +
        "\n\nInput 5 for Character Class on the Create a New Character page.");
        break;
      case 6:
        alert("Insert class details here " + 
        "\n\nIf you are interested in creating a character with this class:" +
        "\n\nInput 6 for Character Class on the Create a New Character page.");
        break;
      case 7:
        alert("Insert class details here " + 
        "\n\nIf you are interested in creating a character with this class:" +
        "\n\nInput 7 for Character Class on the Create a New Character page.");
        break;
      case 8:
        alert("Insert class details here " + 
        "\n\nIf you are interested in creating a character with this class:" +
        "\n\nInput 8 for Character Class on the Create a New Character page.");
        break;
      case 9:
        alert("Insert class details here " + 
        "\n\nIf you are interested in creating a character with this class:" +
        "\n\nInput 9 for Character Class on the Create a New Character page.");
        break;
      case 10:
        alert("Insert class details here " + 
        "\n\nIf you are interested in creating a character with this class:" +
        "\n\nInput 10 for Character Class on the Create a New Character page.");
        break;
      default:
        alert("Invalid class choice.");
        break;
    }
  }
}
