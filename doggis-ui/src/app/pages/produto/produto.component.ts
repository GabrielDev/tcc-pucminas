import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ProdutoService } from 'src/app/providers';
import { Produto, Paginacao, Pagina } from 'src/app/models';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  public produtos: Paginacao<Produto>
  private paginaAtual: Pagina = { page: 0 }

  constructor(
    private service: ProdutoService,
    private mensagem: ToastrService 
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar(pagina?: Pagina) {
    this.paginaAtual = pagina || this.paginaAtual
    this.service.listarPaginado(this.paginaAtual).subscribe(
      resultado => this.produtos = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar listar os produtos')
      }
    )
  }

  confirmarExcluir(produto: Produto) {
    Swal.fire({
      title: 'Atenção',
      text: `Todos os pedidos, históricos de preço, promoções e estoque do produto ${produto.descricao} serão perdidos durante a exclusão, deseja continuar?`,
      icon: 'question',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-default',
        cancelButton: 'btn btn-outline-secondary'
      }
    }).then(({ value }) => {
      if(value) {
        this.excluir(produto)
      }
    })
  }

  private excluir(produto: Produto) {
    this.service.excluir(produto.id).subscribe(
      () => {
        this.mensagem.success(`Produto ${produto.descricao} excluído com sucesso`)
        this.listar()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar excluir esse produto')
      }
    )
  }
}
