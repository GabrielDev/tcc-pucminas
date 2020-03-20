import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ROUTES } from '../sidebar/sidebar.component';
import { Usuario, NotAllowedResponse } from 'src/app/models';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public focus: boolean
  public rotas: any[]
  public nomeUsuario: string
  public usuario$: Observable<Usuario>
  public resultadoBusca: any

  constructor(
    public location: Location,
    private service: AuthService,
    private router: Router
  ) { 
    this.usuario$ = service.obterUsuario()
  }

  ngOnInit() {
    this.rotas = ROUTES.filter(rota => rota)
  }

  obterTitulo() {
    let rotaAtual = this.location.prepareExternalUrl(this.location.path())
    if (rotaAtual.charAt(0) === '#') {
      rotaAtual = rotaAtual.slice(1)
    }

    let rota = this.rotas.find(rota => rota.path === rotaAtual)

    return rota?.title || 'Dashboard'
  }

  buscar(text$: Observable<string>) {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(termo => termo.length >= 2),
      map(termo => this.rotas.filter(rota => new RegExp(termo, 'mi').test(rota.title)).slice(0, 10))
    )
  }

  formatar(rota: any) {
    return rota.title
  }

  redirecionar() {
    this.router.navigate([this.resultadoBusca.path])
  }

  sair() {
    this.service.logout()
    this.router.navigate([''])
  }
}
