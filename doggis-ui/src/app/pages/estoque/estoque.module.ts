import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueComponent } from './estoque.component';
import { EstoqueFormComponent } from './estoque-form/estoque-form.component';

@NgModule({
  declarations: [EstoqueComponent, EstoqueFormComponent],
  imports: [
    CommonModule
  ]
})
export class EstoqueModule { }
