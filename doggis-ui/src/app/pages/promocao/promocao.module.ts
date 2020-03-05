import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule, AutoCompleteModule, CalendarModule } from 'primeng';
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
    CalendarModule,
    PaginatorModule,
  ],
  declarations: [PromocaoComponent, PromocaoFormComponent],
  exports: [PromocaoComponent],
})
export class PromocaoModule { }
