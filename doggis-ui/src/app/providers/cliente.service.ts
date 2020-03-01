import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Cliente, Avaliacao, Paginacao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente>{

  constructor(http: HttpClient) { 
    super(http, '/cliente')
  }

  public buscar(termo: string) {
    return this.http.get<Cliente[]>(`${this.endpoint}?termo=${termo}`)
  }

  public listarPaginado() {
    return this.http.get<Paginacao<Cliente>>(`${this.endpoint}/paginado`)
  }

  public listarAvaliacoesPendentes(cliente: Cliente) {
    return this.http.get<Avaliacao[]>(`${this.endpoint}/avaliacoes-pendentes/${cliente.id}`)
  }

  public listarAvaliacoes(cliente: Cliente) {
    return this.http.get<Avaliacao[]>(`${this.endpoint}/avaliacoes/${cliente.id}`)
  }
}