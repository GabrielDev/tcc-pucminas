import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Fabricante } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService extends GenericService<Fabricante>{
  constructor(http: HttpClient) { 
    super(http, '/fabricante')
  }
}