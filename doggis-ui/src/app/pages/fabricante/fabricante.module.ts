import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PaginatorModule, ProgressBarModule } from 'primeng';
import { FabricanteFormComponent } from './fabricante-form/fabricante-form.component';
import { FabricanteComponent } from './fabricante.component';

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
  declarations: [FabricanteComponent, FabricanteFormComponent],
  exports: [FabricanteComponent, FabricanteFormComponent],
})
export class FabricanteModule { }
