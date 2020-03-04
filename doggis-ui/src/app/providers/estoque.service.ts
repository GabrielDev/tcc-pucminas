import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estoque, Paginacao } from '../models';
import { HeaderInterceptorService } from './headerInterceptor.service';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class EstoqueService extends HeaderInterceptorService {
  private endpoint: string = API + '/estoque'

  constructor(private http: HttpClient) { 
    super()
  }

  public obterPorId(id: number) {
    const headers = this.prepareHeader()
    return this.http.get<Estoque>(`${this.endpoint}/${id}`, headers)
  }

  public listar() {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Estoque>>(this.endpoint, headers)
  }

  public salvar(item: Estoque) {
    const headers = this.prepareHeader()
    return this.http.post<Estoque>(this.endpoint, item, headers)
  }

  public excluir(id: number) {
    const headers = this.prepareHeader()
    return this.http.delete(`${this.endpoint}/${id}`, headers)
  }
}