import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropComponent } from './image-crop.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ImageCropperModule
  ],
  declarations: [ImageCropComponent],
  exports: [ImageCropComponent],
})
export class ImageCropModule { }
