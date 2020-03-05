import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Servico, HistoricoPreco, Promocao, Produto, Paginacao, Pagina } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends GenericService<Servico>{
  constructor(http: HttpClient) { 
    super(http, '/servico')
  }

  public listarPaginado(pagina: Pagina) {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Produto>>(`${this.endpoint}/paginado?page=${pagina.page}`, headers)
  }

  public obterPromocao(servico: Servico) {
    const headers = this.prepareHeader()
    return this.http.get<Promocao>(`${this.endpoint}/${servico.id}/promocao`, headers)
  }

  public listarHistorico(servico: Servico) {
    const headers = this.prepareHeader()
    return this.http.get<HistoricoPreco[]>(`${this.endpoint}/${servico.id}/historico`, headers)
  }

  public adicionarProduto(servico: Servico, produto: Produto) {
    const headers = this.prepareHeader()
    return this.http.post<Servico>(`${this.endpoint}/${servico.id}/produto`, { produto })
  }

  public removerProduto(servico: Servico, produto: Produto) {
    const headers = this.prepareHeader()
    return this.http.delete<Servico>(`${this.endpoint}/${servico.id}/produto/${produto.id}`, headers)
  }
}