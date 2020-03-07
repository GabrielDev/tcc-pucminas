import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estoque, Paginacao, Pagina, Produto } from '../models';
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

  public listar(pagina: Pagina, produto?: Produto) {
    const headers = this.prepareHeader()
    let url = `${this.endpoint}?page=${pagina.page}`
    url += produto? `&idProduto=${produto?.id}`: ``

    return this.http.get<Paginacao<Estoque>>(url, headers)
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