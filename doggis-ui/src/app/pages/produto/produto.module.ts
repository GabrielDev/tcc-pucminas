import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule } from 'primeng';
import { ProdutoComponent } from './produto.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoService, FabricanteService, CategoriaService } from 'src/app/providers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    PaginatorModule,
  ],
  providers: [ProdutoService, FabricanteService, CategoriaService],
  declarations: [ProdutoComponent, ProdutoFormComponent],
  exports: [ProdutoComponent, ProdutoFormComponent]
})
export class ProdutoModule { }
