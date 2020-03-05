import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EstoqueService, ProdutoService } from 'src/app/providers';
import { Paginacao, Estoque, Produto, Pagina } from 'src/app/models';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {

  public estoques: Paginacao<Estoque>
  public abrirModal: Subject<Estoque> = new Subject()
  public produtos: Produto[] = []
  public termo: string
  private paginaAtual: Pagina = { page: 0 }

  constructor(
    private estoqueService: EstoqueService,
    private produtoService: ProdutoService,
    private mensagem: ToastrService,
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar(pagina: Pagina = this.paginaAtual, produto?: Produto) {
    this.paginaAtual = pagina
    this.estoqueService.listar(this.paginaAtual, produto).subscribe(
      resultado => this.estoques = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar listar os estoques')
      }
    )
  }

  buscarProduto() {
    this.produtoService.buscar(this.termo).subscribe(
      resultado => this.produtos = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar listar os produtos')
      }
    )
  }

  novo() {
    this.abrirModal.next()
  }

  excluir(estoque: Estoque) {
    this.estoqueService.excluir(estoque.id).subscribe(
      () => {
        this.mensagem.success(`Estoque do produto ${estoque.produto.descricao} excluído com sucesso`)
        this.listar()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar excluir esse estoque')
      }
    )
  }
}
