import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ProdutoService } from 'src/app/providers';
import { Produto, Paginacao } from 'src/app/models';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  public produtos: Paginacao<Produto>
  public abrirModal: Subject<Produto> = new Subject()

  constructor(
    private service: ProdutoService,
    private mensagem: ToastrService 
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar() {
    this.service.listarPaginado().subscribe(
      resultado => this.produtos = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar listar os produtos')
      }
    )
  }

  alterar(produto: Produto) {
    this.abrirModal.next(produto)
  }

  novo() {
    this.abrirModal.next()
  }

  excluir(produto: Produto) {
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
