import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Cliente, Avaliacao } from '../models';
import { Paginacao } from '../models/paginacao';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente>{
  constructor(http: HttpClient) { 
    super(http, '/cliente')
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