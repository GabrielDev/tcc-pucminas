import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Produto, HistoricoPreco, Estoque, Promocao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends GenericService<Produto>{
  constructor(http: HttpClient) { 
    super(http, '/produto')
  }

  public obterEstoque(produto: Produto) {
    return this.http.get<Estoque>(`${this.endpoint}/${produto.id}/estoque`)
  }

  public obterPromocao(produto: Produto) {
    return this.http.get<Promocao>(`${this.endpoint}/${produto.id}/promocao`)
  }

  public listarHistorico(produto: Produto) {
    return this.http.get<HistoricoPreco[]>(`${this.endpoint}/${produto.id}/historico`)
  }
}