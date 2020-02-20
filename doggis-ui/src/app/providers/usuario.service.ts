import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Usuario, Perfil, Avaliacao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario> {
  constructor(http: HttpClient) { 
    super(http, '/usuario')
  }

  public listarPorPerfil(perfis: Perfil[]) {
    return this.http.post<Usuario[]>(this.endpoint, { perfis })
  }

  public listarAvaliacoes(usuario: Usuario) {
    return this.http.get<Avaliacao[]>(`${this.endpoint}/avaliacoes/${usuario.id}`)
  }

  public bloquear(usuario: Usuario) {
    return this.excluir(usuario.id)
  }
}
