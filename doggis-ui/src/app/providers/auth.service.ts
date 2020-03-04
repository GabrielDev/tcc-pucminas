import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '.';
import { Login, Usuario, AuthResponse } from '../models';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = API + '/auth'
  private endpointUsuario = API + '/usuario'
  private nomeUsuario: string
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

  public obterNomeUsuario(): any {
    return this.nomeUsuario
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