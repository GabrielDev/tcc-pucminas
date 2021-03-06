import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Usuario, Perfil, Avaliacao, Paginacao, Pagina } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario> {
  
  constructor(http: HttpClient) {
    super(http, '/usuario')
  }

  public buscar(termo: string) {
    const headers = this.prepareHeader()
    return this.http.get<Usuario>(`${this.endpoint}?termo=${termo}`, headers)
  }

  public salvarMinhaConta(usuario: Usuario) {
    const headers = this.prepareHeader()
    return this.http.post<Usuario>(`${this.endpoint}/minha-conta`, usuario, headers)
  }

  public alterarSenha(usuario: Usuario) {
    const headers = this.prepareHeader()
    return this.http.post<Usuario>(`${this.endpoint}/minha-conta/senha`, usuario, headers)
  }

  public listarPaginado(pagina: Pagina) {
    const headers = this.prepareHeader()
    return this.http.get<Paginacao<Usuario>>(`${this.endpoint}/paginado?page=${pagina.page}`, headers)
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
