import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './loginPageElements/login-page';
import { SignupComponent } from './signup';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
