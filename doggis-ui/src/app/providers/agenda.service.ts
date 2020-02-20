import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Agenda, Servico, Usuario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AgendaService extends GenericService<Agenda>{
  constructor(http: HttpClient) { 
    super(http, '/agenda')
  }

  public listarDisponiveis(servico: Servico, data: Date) {
    return this.http.post<Usuario[]>(`${this.endpoint}/disponiveis`, { servico, data })
  }

  public verificarDisponibilidade(servico: Servico, usuario: Usuario, data: Date) {
    return this.http.post<boolean>(`${this.endpoint}/verificar`, { servico, usuario, data })
  }
}