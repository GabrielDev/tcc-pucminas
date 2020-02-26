import { Routes } from '@angular/router';

import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegistroComponent } from 'src/app/pages/registro/registro.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cadastre-se', component: RegistroComponent }
];
