import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpellsComponent } from './spells/spells.component';
import { ItemsComponent } from './items/items.component';
import { CharactersComponent } from './characters/characters.component';
import { ClassesComponent } from './classes/classes.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { CreateCharactersComponent } from './characters/create-characters/create-characters/create-characters.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminDeleteComponent } from './admin-delete/admin-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SpellsComponent,
    ItemsComponent,
    CharactersComponent,
    ClassesComponent,
    UsersComponent,
    CreateCharactersComponent,
    ViewUsersComponent,
    AdminAddComponent,
    AdminDeleteComponent,
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
