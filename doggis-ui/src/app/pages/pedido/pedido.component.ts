import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/providers';
import { Pedido, Paginacao } from 'src/app/models';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  public pedidos: Paginacao<Pedido>

  constructor(
    private service: PedidoService,
    private mensagem: ToastrService,
  ) {}

  ngOnInit() {

  }

  listar() {
    this.service.listar().subscribe(
      resultado => this.pedidos = resultado,
      console.warn
    )
  }
  
  excluir(pedido: Pedido) {
    this.service.excluir(pedido.id).subscribe(
      () => {
        this.mensagem.success(`O pedido no. ${pedido.id} foi excluído com sucesso!`)
        this.listar()
      },
      console.warn
    )
  }
}
