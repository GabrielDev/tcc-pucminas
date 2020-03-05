import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/providers';
import { Pedido, Paginacao, Pagina } from 'src/app/models';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  public pedidos: Paginacao<Pedido>
  private paginaAtual: Pagina = { page: 0 }

  constructor(
    private service: PedidoService,
    private mensagem: ToastrService,
  ) {}

  ngOnInit() {
    this.listar()
  }

  listar(pagina: Pagina = this.paginaAtual) {
    this.paginaAtual = pagina
    this.service.listar(this.paginaAtual).subscribe(
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
