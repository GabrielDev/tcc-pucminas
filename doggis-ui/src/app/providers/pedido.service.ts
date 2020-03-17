import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pedido, Paginacao, ItemVenda, Pagamento, Pagina, PedidoItem } from '../models';
import { HeaderInterceptorService } from './headerInterceptor.service';
import { Subject } from 'rxjs';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends HeaderInterceptorService {
  private endpoint: string = API + '/pedido'

  constructor(private http: HttpClient) {
    super()
   }

  public obterPorId(id: number) {
    const headers = this.prepareHeader()
    return this.http.get<Pedido>(`${this.endpoint}/${id}`, headers)
  }

  public listar(pagina: Pagina) {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Pedido>>(`${this.endpoint}?page=${pagina.page}`, headers)
  }

  public salvar(item: Pedido) {
    const headers = this.prepareHeader()
    return this.http.post<Pedido>(this.endpoint, item, headers)
  }

  public excluir(id: number) {
    const headers = this.prepareHeader()
    return this.http.delete(`${this.endpoint}/${id}`, headers)
  }

  public buscar(termo: string) {
    const headers = this.prepareHeader()
    return this.http.get<ItemVenda[]>(`${this.endpoint}/buscar?termo=${termo}`, headers)
  }

  public listarPagamentos() {
    const headers = this.prepareHeader()
    return this.http.get<Pagamento[]>(`${this.endpoint}/pagamento`, headers)
  }
}