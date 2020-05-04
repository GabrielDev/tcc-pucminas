import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule, MultiSelectModule, InputMaskModule, ProgressSpinnerModule } from 'primeng';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ImageCropModule } from 'src/app/core/image-crop/image-crop.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ImageCropModule,
    SweetAlert2Module,
    InputMaskModule,
    ProgressSpinnerModule,
    PaginatorModule,
    MultiSelectModule,
  ],
  declarations: [UsuarioComponent, UsuarioFormComponent],
  exports: [UsuarioComponent, UsuarioFormComponent]
})
export class UsuarioModule { }
