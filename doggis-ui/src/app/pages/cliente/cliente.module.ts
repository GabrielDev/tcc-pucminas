import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PaginatorModule, InputMaskModule } from 'primeng';
import { ClienteComponent } from './cliente.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteService, EstadoService, PetService } from 'src/app/providers';
import { PetComponent } from './pet/pet.component';
import { ImageCropModule } from 'src/app/core/image-crop/image-crop.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SweetAlert2Module,
    InputMaskModule,
    PaginatorModule,
    ImageCropModule
  ],
  providers: [ClienteService, PetService, EstadoService],
  declarations: [ClienteComponent, ClienteFormComponent, PetComponent],
  exports: [ClienteComponent, ClienteFormComponent, PetComponent]
})
export class ClienteModule { }
