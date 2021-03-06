import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '.';
import { Login, Usuario, AuthResponse, Papel } from '../models';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = API + '/auth'
  private endpointUsuario = API + '/usuario'
  private nomeUsuario: string
  private papeis: Papel[] = []
  private usuarioSubject = new BehaviorSubject<Usuario>(null)

  constructor(
    protected http: HttpClient,
    private tokenService: TokenService
  ) { 
    this.tokenService.hasToken() && this.decodificar()
  }

  public login(usuario: Login) {
    return this.http.post<AuthResponse>(this.endpoint, usuario)
  }

  public logout() {
    this.tokenService.removeToken()
    this.usuarioSubject.next(null)
  }

  public setToken(token: string) {
    this.tokenService.setToken(token)
    this.decodificar()
  }

  public obterUsuario() {
    return this.usuarioSubject.asObservable()
  }

  public notificar(usuario: Usuario) {
    this.nomeUsuario = usuario.nome
    this.usuarioSubject.next(usuario)
  }

  public obterNomeUsuario(): any {
    return this.nomeUsuario
  }

  public temPermissao(recurso: string) {
    let autorizadas = ['nao-autorizado', 'nao-encontrado']
    let permitido = autorizadas.includes(recurso)

    if(!permitido) {
      permitido = this.papeis.some(papel => recurso.includes(papel.menu))
    }

    return permitido
  }

  public obterRotaPadrao() {
    let rota = 'nao-autorizado'

    if(this.papeis.length) {
      rota = this.papeis[0].menu
    }

    return rota
  }

  public isLogado() {
    return this.tokenService.hasToken()
  }

  private decodificar() {
    const hash = this.tokenService.getToken()
    const token = jwt_decode(hash) as Token

    this.http.get<Usuario>(`${this.endpointUsuario}/${token.sub}`)
             .subscribe(
               usuario => {
                this.nomeUsuario = usuario.nome
                this.papeis = usuario.perfil.papeis || []
                this.usuarioSubject.next(usuario)
               }, console.warn)
  }
}

export interface Token {
  iss: string,
  sub: string,
  iat: Date,
  exp: Date
}