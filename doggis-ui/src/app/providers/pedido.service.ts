import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pedido, Paginacao } from '../models';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private endpoint: string = API + '/pedido'

  constructor(private http: HttpClient) { }

  public obterPorId(id: number) {
    return this.http.get<Pedido>(`${this.endpoint}/${id}`)
  }

  public listar() {
    return this.http.get<Paginacao<Pedido>>(this.endpoint)
  }

  public salvar(item: Pedido) {
    return this.http.post<Pedido>(this.endpoint, item)
  }

  public excluir(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`)
  }
}