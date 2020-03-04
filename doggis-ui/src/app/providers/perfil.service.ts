import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Perfil, Papel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends GenericService<Perfil>{

  constructor(http: HttpClient) {
    super(http, '/perfil')
  }

  public ativar(perfil: Perfil) {
    const headers = this.prepareHeader()
    return this.http.get<Perfil>(`${this.endpoint}/ativar/${perfil.id}`, headers)
  }

  public listarPapeis() {
    const headers = this.prepareHeader()
    return this.http.get<Papel[]>(`${this.endpoint}/papel`, headers)
  }

  public listarPapeisPorPerfil(perfil: Perfil) {
    const headers = this.prepareHeader()
    return this.http.get<Papel[]>(`${this.endpoint}/papel/${perfil.id}`, headers)
  }
}