import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Estado } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EstadoService extends GenericService<Estado>{
  constructor(http: HttpClient) { 
    super(http, '/estado')
  }
}