import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './loginPageElements/login-page';
import { SignupComponent } from './signup';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
