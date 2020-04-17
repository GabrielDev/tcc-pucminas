import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/providers';
import { Pedido } from 'src/app/models';

@Component({
  selector: 'app-pedido-detalhe',
  templateUrl: './pedido-detalhe.component.html',
  styleUrls: ['./pedido-detalhe.component.scss']
})
export class PedidoDetalheComponent implements OnInit {

  public carregando: boolean
  public pedido: Pedido

  constructor(
    private mensagem: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private service: PedidoService,
  ) { }

  ngOnInit(): void {
    let { id } = this.route.snapshot.params
    this.obterPedido(id)
  }

  obterPedido(id: number) {
    this.carregando = true
    this.service.obterPorId(id).subscribe(
      resultado => this.obterItens(resultado),
      error => {
        console.warn(error)
        this.mensagem.error('Ocorreu um erro ao tentar recuperar esse pedido')
        this.router.navigate(['/pedido'])
      },
      () => this.carregando = false
    )
  }

  private obterItens(pedido: Pedido) {
    let { itens } = pedido
    
    pedido.itens = itens.map(pedidoItem => {
      if(pedidoItem.produto) {
        pedidoItem.item = pedidoItem.produto
      } else {
        pedidoItem.item = pedidoItem.servico
      }

      return pedidoItem
    })

    this.pedido = pedido
  }
}
