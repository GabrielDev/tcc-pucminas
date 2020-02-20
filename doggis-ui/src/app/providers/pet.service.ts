import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Pet, Especie, Raca } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PetService extends GenericService<Pet>{
  constructor(http: HttpClient) {
    super(http, '/pet')
  }

  public listarEspecies() {
    return this.http.get<Especie[]>(`${this.endpoint}/especie`)
  }

  public listarRacas(especie: Especie) {
    return this.http.get<Raca[]>(`${this.endpoint}/raca/${especie.id}`)
  }
}