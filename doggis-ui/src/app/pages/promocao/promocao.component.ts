import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PromocaoService } from 'src/app/providers';
import Swal from 'sweetalert2';
import { Paginacao, Promocao, Pagina, ItemVenda, TipoItem } from 'src/app/models';

@Component({
  selector: 'app-promocao',
  templateUrl: './promocao.component.html',
  styleUrls: ['./promocao.component.scss']
})
export class PromocaoComponent implements OnInit {

  public carregando: boolean
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
    this.carregando = true
    this.service.listarPaginado(this.paginaAtual).subscribe(
      resultado => {
        this.promocoes = resultado

        this.promocoes.content = this.promocoes.content.map(promocao => {
          promocao.item = promocao.produto || promocao.servico
          return promocao
        })
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar listar os promoçōes')
      },
      () => this.carregando = false
    )
  }

  novo() {
    this.abrirModal.next()
  }

  editar(promocao: Promocao) {
    this.abrirModal.next(promocao)
  }

  confirmarExcluir(promocao: Promocao) {
    Swal.fire({
      title: 'Atenção',
      text: 'Deseja realmente continuar?',
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
        this.excluir(promocao)
      }
    })
  }

  excluir(promocao: Promocao) {
    this.service.excluir(promocao.id).subscribe(
      () => {
        this.mensagem.success(`Promoção do produto ${promocao.item.descricao} excluída com sucesso`)
        this.listar()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar excluir essa promoção')
      }
    )
  }

  valorComDesconto(promocao: Promocao) {
    return (1 - promocao.desconto/100) * promocao.item.valor
  }
}
