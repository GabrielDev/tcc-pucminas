import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule, InputMaskModule, ProgressSpinnerModule } from 'primeng';
import { ImageCropModule } from 'src/app/core/image-crop/image-crop.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProdutoComponent } from './produto.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ImageCropModule,
    SweetAlert2Module,
    ProgressSpinnerModule,
    PaginatorModule,
    InputMaskModule,
  ],
  declarations: [ProdutoComponent, ProdutoFormComponent],
  exports: [ProdutoComponent, ProdutoFormComponent]
})
export class ProdutoModule { }
