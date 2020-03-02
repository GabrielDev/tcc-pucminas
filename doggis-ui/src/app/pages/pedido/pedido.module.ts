import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule, SpinnerModule } from 'primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService, ClienteService, ProdutoService, ServicoService } from 'src/app/providers';
import { PedidoComponent } from './pedido.component';
import { VendaComponent } from './venda/venda.component';
import { PedidoDetalheComponent } from './pedido-detalhe/pedido-detalhe.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SpinnerModule,
    AutoCompleteModule,
  ],
  declarations: [PedidoComponent, VendaComponent, PedidoDetalheComponent],
  exports: [PedidoComponent, VendaComponent, PedidoDetalheComponent],
  providers: [
    PedidoService,
    ClienteService,
    ProdutoService,
    ServicoService,
  ]
})
export class PedidoModule { }
