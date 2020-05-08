import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Agenda, Servico, Usuario, Agendamento } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AgendaService extends GenericService<Agenda>{
  constructor(http: HttpClient) { 
    super(http, '/agenda')
  }

  public listarDisponiveis(servico: Servico, dataAgenda: Date) {
    const headers = this.prepareHeader()
    return this.http.post<Agendamento[]>(`${this.endpoint}/disponiveis`, { servico, dataAgenda }, headers)
  }

  public verificarDisponibilidade(servico: Servico, usuario: Usuario, data: Date) {
    const headers = this.prepareHeader()
    return this.http.post<boolean>(`${this.endpoint}/verificar`, { servico, usuario, data }, headers)
  }
}