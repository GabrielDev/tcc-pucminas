import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Promocao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService extends GenericService<Promocao>{
  constructor(http: HttpClient) { 
    super(http, '/promocao')
  }
}