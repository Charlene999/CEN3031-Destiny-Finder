import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './loginPageElements/login-page';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent }
  //{ path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
