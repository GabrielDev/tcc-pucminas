import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Promocao, Paginacao, Pagina } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService extends GenericService<Promocao>{
  
  constructor(http: HttpClient) {
    super(http, '/promocao')
  }

  public listarPaginado(pagina: Pagina) {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Promocao>>(`${this.endpoint}/paginado?page=${pagina.page}`, headers)
  }

}