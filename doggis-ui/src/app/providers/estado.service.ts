import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../models';
import { HeaderInterceptorService } from './headerInterceptor.service';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class EstadoService extends HeaderInterceptorService {

  private endpoint = API + '/estado'

  constructor(private http: HttpClient) {
    super()
  }

  public listar() {
    const headers = this.prepareHeader()
    return this.http.get<Estado[]>(this.endpoint, headers)
  }
}