import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PickListModule } from 'primeng/picklist';
import { PerfilService } from 'src/app/providers';
import { PerfilComponent } from './perfil.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    PickListModule,
  ],
  declarations: [
    PerfilComponent,
    PerfilFormComponent
  ],
  exports: [
    PerfilComponent,
    PerfilFormComponent
  ],
  providers: [
    PerfilService,
  ],
})
export class PerfilModule { }
