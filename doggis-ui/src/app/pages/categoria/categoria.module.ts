import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PaginatorModule, ProgressBarModule } from 'primeng';
import { CategoriaComponent } from './categoria.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SweetAlert2Module,
    ProgressBarModule,
    PaginatorModule,
  ],
  declarations: [CategoriaComponent, CategoriaFormComponent],
  exports: [CategoriaComponent, CategoriaFormComponent],
})
export class CategoriaModule { }
