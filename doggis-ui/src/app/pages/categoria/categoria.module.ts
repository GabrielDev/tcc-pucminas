import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

@NgModule({
  declarations: [CategoriaComponent, CategoriaFormComponent],
  imports: [
    CommonModule
  ]
})
export class CategoriaModule { }
