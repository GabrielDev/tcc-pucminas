import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule, SpinnerModule } from 'primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidoComponent } from './pedido.component';
import { PedidoService, ClienteService, ProdutoService, ServicoService } from 'src/app/providers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SpinnerModule,
    AutoCompleteModule,
  ],
  declarations: [PedidoComponent],
  providers: [
    PedidoService,
    ClienteService,
    ProdutoService,
    ServicoService,
  ]
})
export class PedidoModule { }
