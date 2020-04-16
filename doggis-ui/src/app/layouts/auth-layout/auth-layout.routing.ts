import { Routes } from '@angular/router';

import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegistroComponent } from 'src/app/pages/registro/registro.component';
import { NaoEncontradoComponent } from 'src/app/pages/erros/nao-encontrado/nao-encontrado.component';
import { NaoAutorizadoComponent } from 'src/app/pages/erros/nao-autorizado/nao-autorizado.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cadastre-se', component: RegistroComponent },
    { path: 'nao-encontrado', component: NaoEncontradoComponent },
    { path: 'nao-autorizado', component: NaoAutorizadoComponent },
];
