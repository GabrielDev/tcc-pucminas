import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Produto, HistoricoPreco, Estoque, Promocao, Paginacao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends GenericService<Produto> {
 
  constructor(http: HttpClient) { 
    super(http, '/produto')
  }

  public listarPaginado() {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Produto>>(`${this.endpoint}/paginado`, headers)
  }

  public buscar(termo: string) {
    const headers = this.prepareHeader()
    return this.http.get<Produto[]>(`${this.endpoint}?termo=${termo}`, headers)
  }

  public obterEstoque(produto: Produto) {
    const headers = this.prepareHeader()
    return this.http.get<Estoque>(`${this.endpoint}/${produto.id}/estoque`, headers)
  }

  public obterPromocao(produto: Produto) {
    const headers = this.prepareHeader()
    return this.http.get<Promocao[]>(`${this.endpoint}/${produto.id}/promocao`, headers)
  }

  public listarHistorico(produto: Produto) {
    const headers = this.prepareHeader()
    return this.http.get<HistoricoPreco[]>(`${this.endpoint}/${produto.id}/historico`, headers)
  }
}