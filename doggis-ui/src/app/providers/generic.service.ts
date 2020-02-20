import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(
    protected http: HttpClient,
    protected endpoint: string,
  ) { 
    this.endpoint = API + this.endpoint
  }

  public obterPorId(id: number) {
    return this.http.get<T>(`${this.endpoint}/${id}`)
  }

  public listar() {
    return this.http.get<T[]>(this.endpoint)
  }

  public salvar(item: T) {
    return this.http.post<T>(this.endpoint, { item })
  }

  public editar(item: T) {
    return this.http.put<T>(this.endpoint, { item })
  }

  public excluir(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`)
  }
}
