import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EstoqueService, ProdutoService } from 'src/app/providers';
import { Paginacao, Estoque, Produto, Pagina, TipoEstoque } from 'src/app/models';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {

  public estoque: Estoque
  public estoques: Paginacao<Estoque>
  public produtos: Produto[] = []
  public termo: string
  private paginaAtual: Pagina = { page: 0 }

  constructor(
    private estoqueService: EstoqueService,
    private mensagem: ToastrService,
  ) { }

  ngOnInit() {
    this.listar()
  }

  filtrar(produto: Produto) {
    this.listar({ page: 0 }, produto)
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

  isEntrada(tipo: TipoEstoque) {
    let [ ENTRADA ] = Object.keys(TipoEstoque)
    return tipo == ENTRADA
  }
}
