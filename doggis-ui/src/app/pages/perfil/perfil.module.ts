import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PickListModule, ProgressSpinnerModule } from 'primeng';
import { PerfilService } from 'src/app/providers';
import { PerfilComponent } from './perfil.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SweetAlert2Module,
    PickListModule,
    ProgressSpinnerModule,
  ],
  declarations: [ PerfilComponent, PerfilFormComponent ],
  exports: [ PerfilComponent, PerfilFormComponent ]
})
export class PerfilModule { }
