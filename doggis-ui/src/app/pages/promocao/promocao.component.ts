import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PromocaoService } from 'src/app/providers';
import { Paginacao, Promocao, Pagina } from 'src/app/models';

@Component({
  selector: 'app-promocao',
  templateUrl: './promocao.component.html',
  styleUrls: ['./promocao.component.scss']
})
export class PromocaoComponent implements OnInit {

  public promocoes: Paginacao<Promocao>
  public abrirModal: Subject<Promocao> = new Subject()
  private paginaAtual: Pagina = { page: 0 }

  constructor(
    private service: PromocaoService,
    private mensagem: ToastrService,
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar(pagina: Pagina = this.paginaAtual) {
    this.paginaAtual = pagina
    this.service.listarPaginado(this.paginaAtual).subscribe(
      resultado => this.promocoes = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar listar os promoçōes')
      }
    )
  }

  novo() {
    this.abrirModal.next()
  }

  editar(promocao: Promocao) {
    this.abrirModal.next(promocao)
  }

  excluir(promocao: Promocao) {
    this.service.excluir(promocao.id).subscribe(
      () => {
        this.mensagem.success(`Promocao do produto ${promocao.item.descricao} excluído com sucesso`)
        this.listar()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar excluir essa promoção')
      }
    )
  }

  valorComDesconto(promocao: Promocao) {
    return (promocao.item.valor * promocao.desconto) / 100
  }
}
