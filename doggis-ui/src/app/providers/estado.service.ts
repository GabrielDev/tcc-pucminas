import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../models';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private endpoint = API + '/estado'

  constructor(private http: HttpClient) {}

  public listar() {
    return this.http.get<Estado[]>(this.endpoint)
  }
}