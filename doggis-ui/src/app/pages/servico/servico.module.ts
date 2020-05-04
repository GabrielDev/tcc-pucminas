import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule, AutoCompleteModule, ProgressSpinnerModule } from 'primeng';
import { ServicoComponent } from './servico.component';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { ImageCropModule } from 'src/app/core/image-crop/image-crop.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ImageCropModule,
    SweetAlert2Module,
    AutoCompleteModule,
    ProgressSpinnerModule,
    PaginatorModule,
  ],
  declarations: [ServicoComponent, ServicoFormComponent],
  exports: [ServicoComponent, ServicoFormComponent],
})
export class ServicoModule { }
