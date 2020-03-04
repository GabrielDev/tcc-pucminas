import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { HeaderInterceptorService } from './headerInterceptor.service';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> extends HeaderInterceptorService {

  protected tokenService: TokenService = new TokenService()

  constructor(
    protected http: HttpClient,
    protected endpoint: string,
  ) {
    super()
    this.endpoint = API + this.endpoint
  }

  public obterPorId(id: number) {
    const headers = this.prepareHeader()
    return this.http.get<T>(`${this.endpoint}/${id}`, headers)
  }

  public listar() {
    const headers = this.prepareHeader()
    return this.http.get<T[]>(this.endpoint, headers)
  }

  public salvar(item: T) {
    const headers = this.prepareHeader()
    return this.http.post<T>(this.endpoint, item, headers)
  }

  public editar(id: number, item: T) {
    const headers = this.prepareHeader()
    return this.http.put<T>(`${this.endpoint}/${id}`, item, headers)
  }

  public excluir(id: number) {
    const headers = this.prepareHeader()
    return this.http.delete(`${this.endpoint}/${id}`, headers)
  }
}
