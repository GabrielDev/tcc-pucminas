import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricanteComponent } from './fabricante.component';
import { FabricanteFormComponent } from './fabricante-form/fabricante-form.component';

@NgModule({
  declarations: [FabricanteComponent, FabricanteFormComponent],
  imports: [
    CommonModule
  ]
})
export class FabricanteModule { }
