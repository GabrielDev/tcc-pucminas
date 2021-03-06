import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Pet, Especie, Raca } from '../models';
import { Paginacao, Pagina } from '../models/paginacao';

@Injectable({
  providedIn: 'root'
})
export class PetService extends GenericService<Pet>{
  
  constructor(http: HttpClient) {
    super(http, '/pet')
  }

  public listarPaginado(pagina?: Pagina) {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Pet>>(`${this.endpoint}/paginado?page=${pagina.page}`, headers)
  }

  public listarEspecies() {
    const headers = this.prepareHeader()
    return this.http.get<Especie[]>(`${this.endpoint}/especie`, headers)
  }

  public listarRacas(especie: Especie) {
    const headers = this.prepareHeader()
    return this.http.get<Raca[]>(`${this.endpoint}/raca/${especie.id}`, headers)
  }
}