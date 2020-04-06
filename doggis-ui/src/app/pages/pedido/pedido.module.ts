import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule, SpinnerModule, PaginatorModule, InputMaskModule } from 'primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PedidoService, ClienteService, ProdutoService, ServicoService } from 'src/app/providers';
import { PedidoComponent } from './pedido.component';
import { VendaComponent } from './venda/venda.component';
import { PedidoDetalheComponent } from './pedido-detalhe/pedido-detalhe.component';
import { ClienteModalComponent } from './cliente-modal/cliente-modal.component';
import { ImageCropModule } from 'src/app/core/image-crop/image-crop.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SpinnerModule,
    SweetAlert2Module,
    AutoCompleteModule,
    InputMaskModule,
    PaginatorModule,
    ImageCropModule,
  ],
  declarations: [PedidoComponent, VendaComponent, PedidoDetalheComponent, ClienteModalComponent],
  exports: [PedidoComponent, VendaComponent, PedidoDetalheComponent, ClienteModalComponent],
  providers: [
    PedidoService,
    ClienteService,
    ProdutoService,
    ServicoService,
  ]
})
export class PedidoModule { }
