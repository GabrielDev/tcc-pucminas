import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule } from 'primeng';
import { ClienteComponent } from './cliente.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteService, EstadoService, PetService } from 'src/app/providers';
import { PetComponent } from './pet/pet.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    PaginatorModule,
  ],
  providers: [ClienteService, PetService, EstadoService],
  declarations: [ClienteComponent, ClienteFormComponent, PetComponent],
  exports: [ClienteComponent, ClienteFormComponent, PetComponent]
})
export class ClienteModule { }
