import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { TablesComponent } from '../../pages/tables/tables.component';

import { AgendaComponent } from 'src/app/pages/agenda/agenda.component';
import { AvaliacaoComponent } from 'src/app/pages/avaliacao/avaliacao.component';
import { CategoriaComponent } from 'src/app/pages/categoria/categoria.component';
import { ClienteComponent } from 'src/app/pages/cliente/cliente.component';
import { EstoqueComponent } from 'src/app/pages/estoque/estoque.component';
import { FabricanteComponent } from 'src/app/pages/fabricante/fabricante.component';
import { MinhaContaComponent } from 'src/app/pages/minha-conta/minha-conta.component';
import { PedidoComponent } from 'src/app/pages/pedido/pedido.component';
import { PerfilComponent } from 'src/app/pages/perfil/perfil.component';
import { ProdutoComponent } from 'src/app/pages/produto/produto.component';
import { PromocaoComponent } from 'src/app/pages/promocao/promocao.component';
import { ServicoComponent } from 'src/app/pages/servico/servico.component';
import { UsuarioComponent } from 'src/app/pages/usuario/usuario.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },

    { path: 'agenda', component: AgendaComponent },
    { path: 'avaliacao', component: AvaliacaoComponent },
    { path: 'categoria', component: CategoriaComponent },
    { path: 'cliente', component: ClienteComponent },
    { path: 'estoque', component: EstoqueComponent },
    { path: 'fabricante', component: FabricanteComponent },
    { path: 'minha-conta', component: MinhaContaComponent },
    { path: 'pedido', component: PedidoComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'produto', component: ProdutoComponent },
    { path: 'promocao', component: PromocaoComponent },
    { path: 'servico', component: ServicoComponent },
    { path: 'usuario', component: UsuarioComponent }
];
