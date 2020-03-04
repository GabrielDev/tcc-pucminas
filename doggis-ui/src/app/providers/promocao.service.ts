import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Promocao, Paginacao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService extends GenericService<Promocao>{
  
  constructor(http: HttpClient) {
    super(http, '/promocao')
  }

  public listarPaginado() {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Promocao>>(`${this.endpoint}/paginado`, headers)
  }

}