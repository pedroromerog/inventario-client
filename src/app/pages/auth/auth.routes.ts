import { Routes } from '@angular/router';
import { Access } from './access';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { Login } from './login';
import { Error } from './error';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'change-password', component: ChangePasswordComponent }
] as Routes;
