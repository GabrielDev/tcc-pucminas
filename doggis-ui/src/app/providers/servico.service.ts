import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Servico, HistoricoPreco, Promocao, Produto, Paginacao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends GenericService<Servico>{
  constructor(http: HttpClient) { 
    super(http, '/servico')
  }

  public listarPaginado() {
    return this.http.get<Paginacao<Produto>>(`${this.endpoint}/paginado`)
  }

  public obterPromocao(servico: Servico) {
    return this.http.get<Promocao>(`${this.endpoint}/${servico.id}/promocao`)
  }

  public listarHistorico(servico: Servico) {
    return this.http.get<HistoricoPreco[]>(`${this.endpoint}/${servico.id}/historico`)
  }

  public adicionarProduto(servico: Servico, produto: Produto) {
    return this.http.post<Servico>(`${this.endpoint}/${servico.id}/produto`, { produto })
  }

  public removerProduto(servico: Servico, produto: Produto) {
    return this.http.delete<Servico>(`${this.endpoint}/${servico.id}/produto/${produto.id}`)
  }
}