import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';

import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegistroComponent } from 'src/app/pages/registro/registro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthLayoutRoutes),
  ],
  declarations: [
    LoginComponent,
    RegistroComponent
  ]
})
export class AuthLayoutModule { }
