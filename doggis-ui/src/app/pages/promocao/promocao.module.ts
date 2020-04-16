import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PaginatorModule, AutoCompleteModule, CalendarModule, ProgressBarModule } from 'primeng';
import { PromocaoComponent } from './promocao.component';
import { PromocaoFormComponent } from './promocao-form/promocao-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    AutoCompleteModule,
    SweetAlert2Module,
    CalendarModule,
    ProgressBarModule,
    PaginatorModule,
  ],
  declarations: [PromocaoComponent, PromocaoFormComponent],
  exports: [PromocaoComponent],
})
export class PromocaoModule { }
