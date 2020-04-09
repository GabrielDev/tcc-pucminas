import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Categoria, Pagina, Paginacao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends GenericService<Categoria>{
  constructor(http: HttpClient) { 
    super(http, '/categoria')
  }

  public listarPaginado(pagina?: Pagina) {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Categoria>>(`${this.endpoint}/paginado?page=${pagina.page}`, headers)
  }
}