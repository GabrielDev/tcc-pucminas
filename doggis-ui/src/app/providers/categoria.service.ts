import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Categoria } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends GenericService<Categoria>{
  constructor(http: HttpClient) { 
    super(http, '/categoria')
  }
}