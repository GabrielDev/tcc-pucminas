import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropModule } from 'src/app/core/image-crop/image-crop.module';
import { InputMaskModule } from 'primeng';
import { MinhaContaComponent } from './minha-conta.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ImageCropModule,
    InputMaskModule,
    NgbModule,
  ],
  declarations: [MinhaContaComponent],
  exports: [MinhaContaComponent],
})
export class MinhaContaModule { }
