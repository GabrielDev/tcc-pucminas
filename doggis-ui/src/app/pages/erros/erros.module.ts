import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [NaoEncontradoComponent, NaoAutorizadoComponent],
  exports: [NaoEncontradoComponent, NaoAutorizadoComponent],
})
export class ErrosModule { }
