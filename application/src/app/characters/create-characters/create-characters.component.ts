import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  templateUrl: './create-characters.component.html',
  styleUrls: ['./create-characters.component.css']
})

export class CreateCharactersComponent {

  createSubmitted: Boolean;
  invalidName: string;
  invalidDesc: string;
  invalidLevel: string;
  invalidClass: string;
  constructor(private http: HttpClient, private router: Router) { 
    this.createSubmitted = false;
    this.invalidName ="";
    this.invalidDesc ="";
    this.invalidLevel ="";
    this.invalidClass ="";
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') === null) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(f: NgForm) {

    let Character = {
      "Name": f.value.name,
      "Description": f.value.description,
      "ClassType": Number(f.value.class),
      "Level": Number(f.value.level),
      "OwnerToken": localStorage.getItem('id_token'),
    };

    this.createSubmitted = true;

    // if any values are invalid do not send a post request to create character
    if (this.validName(f.value.name) || this.validDescription(f.value.description) || this.validLevel(Number(f.value.level))
      || this.validClass(Number(f.value.class))) 
      return;

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/characters/create', JSON.stringify(Character),options).subscribe((res: any)=> {
      if (200) {
        alert("Successful character creation.");
        window.location.reload();
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
      }
    );
  }

  // Sets alert to be returned if name is invalid, invalid name returns true (for ngif)
  validName(name: any): boolean {
    if (this.createSubmitted === false)
      return false;
    if (typeof (name) !== 'string') {
      this.invalidName = "Please enter a valid name";
      return true;
    }
    if (name.length === 0) {
      this.invalidName = "Name Required";
      return true;
    }

    if (name.length < 4) {
      this.invalidName = "Name must be at least 4 characters";
      return true
    }

    if (name.length > 50) {
      this.invalidName = "Name can have up to 50 characters";
      return true;
    }

    return false;
  }

  // Sets alert to be returned if description is invalid, invalid description returns true (for ngif)
  validDescription(description: any): boolean {
    if (this.createSubmitted === false)
      return false;

    if (typeof (description) !== 'string') {
      this.invalidDesc = "Please enter a valid description";
      return true;
    }

    if (description.length === 0) {
      this.invalidDesc = "Description Required";
      return true;
    }

    if (description.length < 4) {
      this.invalidDesc = "Description must be at least 4 characters";
      return true;
    }

    if (description.length > 250) {
      this.invalidDesc = "Description can have up to 250 characters";
      return true;
    }

    return false;
  }

  // Sets alert to be returned if level is invalid, invalid level returns true (for ngif)
  validLevel(level: any): boolean {
    if (this.createSubmitted === false)
      return false;

    if (typeof (level) !== 'number') {
      this.invalidLevel = "Please enter a valid level number";
      return true;
    }

    if (level <= 0) {
      this.invalidLevel = "Level must be greater than 0";
      return true;
    }

    if (level > 20) {
      this.invalidLevel = "Character can have a maximum level of 20";
      return true;
    }
    return false;
  }

  // Sets alert to be returned if class is invalid, invalid class returns true (for ngif)
  validClass(Class: any): boolean {
    if (this.createSubmitted === false)
      return false;

    if (typeof (Class) !== 'number') {
      this.invalidClass = "Please enter a valid class number";
      return true;
    }
    if (Class <= 0) {
      this.invalidClass = "Class must be greater than 0";
      return true;
    }

    if (Class > 20) {
      this.invalidClass = "Character can have a maximum class of 20";
      return true;
    }
    return false;
  }
}
