import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Cliente, Avaliacao, Paginacao, Pagina } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente>{

  constructor(http: HttpClient) { 
    super(http, '/cliente')
  }

  public buscar(termo: string) {
    const headers = this.prepareHeader()
    return this.http.get<Cliente[]>(`${this.endpoint}?termo=${termo}`, headers)
  }

  public listarPaginado(pagina?: Pagina) {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Cliente>>(`${this.endpoint}/paginado?page=${pagina.page}`, headers)
  }

  public listarAvaliacoesPendentes(cliente: Cliente) {
    const headers = this.prepareHeader()
    return this.http.get<Avaliacao[]>(`${this.endpoint}/avaliacoes-pendentes/${cliente.id}`, headers)
  }

  public listarAvaliacoes(cliente: Cliente) {
    const headers = this.prepareHeader()
    return this.http.get<Avaliacao[]>(`${this.endpoint}/avaliacoes/${cliente.id}`, headers)
  }
}