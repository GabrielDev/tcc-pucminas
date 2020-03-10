import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Fabricante, Pagina, Paginacao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService extends GenericService<Fabricante>{
  constructor(http: HttpClient) { 
    super(http, '/fabricante')
  }

  public listarPaginado(pagina?: Pagina) {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Fabricante>>(`${this.endpoint}/paginado?page=${pagina.page}`, headers)
  }
}