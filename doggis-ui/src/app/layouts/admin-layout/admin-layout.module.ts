import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgendaModule } from 'src/app/pages/agenda/agenda.module';
import { AvaliacaoModule } from 'src/app/pages/avaliacao/avaliacao.module';
import { CategoriaModule } from 'src/app/pages/categoria/categoria.module';
import { ClienteModule } from 'src/app/pages/cliente/cliente.module';
import { DashboardModule } from 'src/app/pages/dashboard/dashboard.module';
import { EstoqueModule } from 'src/app/pages/estoque/estoque.module';
import { FabricanteModule } from 'src/app/pages/fabricante/fabricante.module';
import { MinhaContaModule } from 'src/app/pages/minha-conta/minha-conta.module';
import { PedidoModule } from 'src/app/pages/pedido/pedido.module';
import { PerfilModule } from 'src/app/pages/perfil/perfil.module';
import { ProdutoModule } from 'src/app/pages/produto/produto.module';
import { PromocaoModule } from 'src/app/pages/promocao/promocao.module';
import { ServicoModule } from 'src/app/pages/servico/servico.module';
import { UsuarioModule } from 'src/app/pages/usuario/usuario.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    AgendaModule,
    AvaliacaoModule,
    CategoriaModule,
    ClienteModule,
    DashboardModule,
    EstoqueModule,
    FabricanteModule,
    MinhaContaModule,
    PedidoModule,
    PerfilModule,
    ProdutoModule,
    PromocaoModule,
    ServicoModule,
    UsuarioModule,
  ],
  declarations: []
})

export class AdminLayoutModule {}
