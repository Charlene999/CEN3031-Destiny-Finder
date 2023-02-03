import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './loginPageElements/login-page/login-page.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
	  HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
