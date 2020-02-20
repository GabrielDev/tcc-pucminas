import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../models';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint =  API + 'auth'

  constructor(
    protected http: HttpClient,
  ) { }

  public login(usuario: Login) {
    return this.http.post(`${this.endpoint}/login`, { usuario })
  }

  public logout() {
    return this.http.get(`${this.endpoint}/logout`)
  }
}