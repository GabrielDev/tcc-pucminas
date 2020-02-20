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
    return this.http.get<Perfil>(`${this.endpoint}/ativar/${perfil.id}`)
  }

  public desativar(perfil: Perfil) {
    return this.excluir(perfil.id)
  }

  public listarPapeis() {
    return this.http.get<Papel[]>(`${this.endpoint}/papel`)
  }

  public listarPapeisPorPerfil(perfil: Perfil) {
    return this.http.get<Papel[]>(`${this.endpoint}/papel/${perfil.id}`)
  }
}