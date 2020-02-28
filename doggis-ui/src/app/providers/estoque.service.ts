import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estoque, Paginacao } from '../models';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private endpoint: string = API + '/estoque'

  constructor(private http: HttpClient) { }

  public obterPorId(id: number) {
    return this.http.get<Estoque>(`${this.endpoint}/${id}`)
  }

  public listar() {
    return this.http.get<Paginacao<Estoque>>(this.endpoint)
  }

  public salvar(item: Estoque) {
    return this.http.post<Estoque>(this.endpoint, item)
  }

  public excluir(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`)
  }
}