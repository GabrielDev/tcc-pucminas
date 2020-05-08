import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule, SpinnerModule, PaginatorModule, InputMaskModule, ProgressSpinnerModule, CalendarModule } from 'primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PedidoComponent } from './pedido.component';
import { PedidoVendaComponent } from './pedido-venda/pedido-venda.component';
import { PedidoDetalheComponent } from './pedido-detalhe/pedido-detalhe.component';
import { ImageCropModule } from 'src/app/core/image-crop/image-crop.module';
import { PedidoDescontoComponent } from './pedido-desconto/pedido-desconto.component';
import { PedidoClienteComponent } from './pedido-cliente/pedido-cliente.component';
import { PedidoAgendaComponent } from './pedido-agenda/pedido-agenda.component';

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
    ProgressSpinnerModule,
    PaginatorModule,
    CalendarModule,
    ImageCropModule,
  ],
  declarations: [PedidoComponent, PedidoVendaComponent, PedidoDetalheComponent, PedidoClienteComponent, PedidoDescontoComponent, PedidoAgendaComponent],
  exports: [PedidoComponent, PedidoVendaComponent, PedidoDetalheComponent, PedidoClienteComponent]
})
export class PedidoModule { }
