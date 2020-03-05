import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule } from 'primeng';
import { EstoqueComponent } from './estoque.component';
import { EstoqueFormComponent } from './estoque-form/estoque-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    PaginatorModule,
  ],
  declarations: [EstoqueComponent, EstoqueFormComponent],
  exports: [EstoqueComponent, EstoqueFormComponent],
})
export class EstoqueModule { }
