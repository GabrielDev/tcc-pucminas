import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Usuario, Perfil, Avaliacao, Paginacao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario> {
  
  constructor(http: HttpClient) {
    super(http, '/usuario')
  }

  public listarPaginado(pagina: number = 1, totalPorPagina: number = 10) {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Usuario>>(`${this.endpoint}/paginado?page=${pagina}&count=${totalPorPagina}`, headers)
  }

  public listarPorPerfil(perfis: Perfil[]) {
    const headers = this.prepareHeader()
    return this.http.post<Usuario[]>(this.endpoint, { perfis }, headers)
  }

  public listarAvaliacoes(usuario: Usuario) {
    const headers = this.prepareHeader()
    return this.http.get<Avaliacao[]>(`${this.endpoint}/avaliacoes/${usuario.id}`, headers)
  }

  public bloquear(usuario: Usuario) {
    return this.excluir(usuario.id)
  }
}
