import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './loginPageElements/login-page';
import { SignupComponent } from './signup';
//import { CharactersComponent } from './characters/characters.component';
import { ClassesComponent } from './classes/classes.component';
import { ItemsComponent } from './items/items.component';
import { SpellsComponent } from './spells/spells.component';

//This is what changes the routing on the home page (localhost:4200)
//NOTE: path must match the routerLink indicated in app.component.html
const routes: Routes = [
  { path: 'users/login', component: LoginPageComponent },
  { path: 'users/create', component: SignupComponent },
  //TODO: Leaving this connection here for now. users/characters will most likely 
  //be changed into users/characters/:id and integrated into users/myprofile.
  //{ path: 'users/characters', component: CharactersComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'spells', component: SpellsComponent },
];

export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
