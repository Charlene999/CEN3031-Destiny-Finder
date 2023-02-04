import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './loginPageElements/login-page';
import { SignupComponent } from './signup';

//This is what changes the routing on the home page (localhost:4200)
//NOTE: path must match the routerLink indicated in app.component.html
const routes: Routes = [
  { path: 'users/login', component: LoginPageComponent },
  { path: 'users/create', component: SignupComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
