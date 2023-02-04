import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './loginPageElements/login-page/login-page.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpellsComponent } from './spells/spells.component';
import { ItemsComponent } from './items/items.component';
import { CharactersComponent } from './characters/characters.component';
import { ClassesComponent } from './classes/classes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupComponent,
    SpellsComponent,
    ItemsComponent,
    CharactersComponent,
    ClassesComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
	  HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
