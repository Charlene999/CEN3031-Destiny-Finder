import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//Made changes here to test a connection between the frontend and backend; derived from the boilerplate project setup given in the class setup announcement
export class AppComponent {
  title = 'frontend';
  connection = 'Backend connection not established'
  
  constructor(private http: HttpClient) {
	this.http.get(`${environment.serverUrl}/ping`).subscribe((data) => {
		var entries = Object.entries(data);
		console.log(entries);
		this.connection = `Backend connection established; ${entries[0][0]}: ${entries[0][1]}`;
	})
  }
}
