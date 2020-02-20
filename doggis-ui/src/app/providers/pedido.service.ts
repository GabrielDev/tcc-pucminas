import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Pedido } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends GenericService<Pedido>{
  constructor(http: HttpClient) { 
    super(http, '/pedido')
  }
}