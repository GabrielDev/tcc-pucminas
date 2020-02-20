import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Cliente, Avaliacao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente>{
  constructor(http: HttpClient) { 
    super(http, '/cliente')
  }

  public listarAvaliacoesPendentes(cliente: Cliente) {
    return this.http.get<Avaliacao[]>(`${this.endpoint}/avaliacoes-pendentes/${cliente.id}`)
  }

  public listarAvaliacoes(cliente: Cliente) {
    return this.http.get<Avaliacao[]>(`${this.endpoint}/avaliacoes/${cliente.id}`)
  }
}