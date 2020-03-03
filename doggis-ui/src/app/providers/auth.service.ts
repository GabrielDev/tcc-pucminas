import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { Login, Usuario } from '../models';
import { TokenService } from '.';
import { BehaviorSubject } from 'rxjs';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = API + 'auth'
  private nomeUsuario: string
  private usuarioSubject = new BehaviorSubject<Usuario>(null)

  constructor(
    protected http: HttpClient,
    private tokenService: TokenService
  ) { 
    this.tokenService.hasToken() && this.decodificar()
  }

  public login(usuario: Login) {
    return this.http.post(`${this.endpoint}/login`, { usuario })
  }

  public logout() {
    this.http.get(`${this.endpoint}/logout`).subscribe(
        () => {
          this.tokenService.removeToken()
          this.usuarioSubject.next(null)
        })
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
    const token = this.tokenService.getToken()
    const usuario = jwt_decode(token) as Usuario
    this.nomeUsuario = usuario.nome
    this.usuarioSubject.next(usuario)
  }
}