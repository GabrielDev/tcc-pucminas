import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Pet, Especie, Raca } from '../models';
import { Paginacao } from '../models/paginacao';

@Injectable({
  providedIn: 'root'
})
export class PetService extends GenericService<Pet>{
  constructor(http: HttpClient) {
    super(http, '/pet')
  }

  public listarPaginado() {
    return this.http.get<Paginacao<Pet>>(`${this.endpoint}/paginado`)
  }

  public listarEspecies() {
    return this.http.get<Especie[]>(`${this.endpoint}/especie`)
  }

  public listarRacas(especie: Especie) {
    return this.http.get<Raca[]>(`${this.endpoint}/raca/${especie.id}`)
  }
}