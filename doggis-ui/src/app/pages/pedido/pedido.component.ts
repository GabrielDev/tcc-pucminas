import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { PedidoService } from 'src/app/providers';
import { Pedido, Paginacao, Pagina } from 'src/app/models';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  public carregando: boolean
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
    this.carregando = true
    this.service.listar(this.paginaAtual).subscribe(
      resultado => this.pedidos = resultado,
      console.warn,
      () => this.carregando = false
    )
  }

  confirmarExcluir(pedido: Pedido) {
    Swal.fire({
      title: 'Atenção',
      text: `Todos os produtos do pedido no. ${pedido.id} retornarão ao estoque durante a exclusão, deseja continuar?`,
      icon: 'warning',
      confirmButtonText: 'Sim, prosseguir',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-secondary'
      }
    }).then(({ value }) => {
      if(value) {
        this.excluir(pedido)
      }
    })
  }
  
  private excluir(pedido: Pedido) {
    this.service.excluir(pedido.id).subscribe(
      () => {
        this.mensagem.success(`O pedido no. ${pedido.id} foi excluído com sucesso!`)
        this.listar()
      },
      console.warn
    )
  }
}
