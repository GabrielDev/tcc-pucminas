import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/providers/auth.service'

declare interface RouteInfo {
    path: string
    title: string
    icon: string
    class: string
    grupo: string
}
export const ROUTES: RouteInfo[] = [
    { grupo: 'Venda', path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { grupo: 'Venda', path: '/agenda', title: 'Agenda', icon: 'ni-calendar-grid-58 text-primary', class: ''},
    { grupo: 'Venda', path: '/pedido', title: 'Pedidos', icon: 'ni-cart text-primary', class: ''},
    { grupo: 'Venda', path: '/venda', title: 'Venda', icon: 'ni-basket text-primary', class: ''},
    { grupo: 'Venda', path: '/avaliacao', title: 'Avaliação', icon: 'ni-chat-round text-primary', class: ''},
    { grupo: 'Venda', path: '/promocao', title: 'Promoções', icon: 'ni-tag text-primary', class: ''},
    { grupo: 'Cadastro', path: '/cliente', title: 'Clientes', icon: 'ni-single-02 text-orange', class: ''},
    { grupo: 'Cadastro', path: '/servico', title: 'Serviços', icon: 'ni-scissors text-orange', class: ''},
    { grupo: 'Cadastro', path: '/produto', title: 'Produtos', icon: 'ni-tie-bow text-orange', class: ''},
    { grupo: 'Cadastro', path: '/estoque', title: 'Estoque', icon: 'ni-box-2 text-orange', class: ''},
    { grupo: 'Cadastro', path: '/categoria', title: 'Categorias', icon: 'ni-book-bookmark text-orange', class: ''},
    { grupo: 'Cadastro', path: '/fabricante', title: 'Fabricantes', icon: 'ni-building text-orange', class: ''},
    { grupo: 'Acesso', path: '/usuario', title: 'Usuários', icon: 'ni-circle-08 text-info', class: ''},
    { grupo: 'Acesso', path: '/perfil', title: 'Perfis', icon: 'ni-badge text-info', class: ''},
]


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menus: any[]
  public isCollapsed = true

  constructor(
    private router: Router,
    private service: AuthService
  ) { }

  ngOnInit() {
    this.service.obterUsuario().subscribe(
     usuario => {
       if(usuario) {
         this.obterRotasPorPermissao()
       }
     },
     console.warn)
  }

  obterRotasPorPermissao() {
    let rotas = ROUTES.filter(rota => this.service.temPermissao(rota.path.substr(1)))
    this.menus = this.obterRotasPorGrupo(rotas)

    this.router.events.subscribe((event) => {
      this.isCollapsed = true
   })
  }

  obterRotasPorGrupo(rotas: any) {
    let agrupador = []
    let grupos = []

    rotas.forEach(item => {
      let {grupo, ...rota} = item
      if(!agrupador[grupo]) {
        agrupador[grupo] = []
      }
      agrupador[grupo].push(rota)
    })
    
    for (let grupo in agrupador) {
      grupos.push({ grupo, rotas: agrupador[grupo] })
    }

    return grupos
  }

  
}
