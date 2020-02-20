import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Estoque } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService extends GenericService<Estoque>{
  constructor(http: HttpClient) { 
    super(http, '/estoque')
  }
}