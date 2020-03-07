import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule, MultiSelectModule } from 'primeng';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    PaginatorModule,
    MultiSelectModule,
  ],
  declarations: [UsuarioComponent, UsuarioFormComponent],
  exports: [UsuarioComponent, UsuarioFormComponent],
})
export class UsuarioModule { }
