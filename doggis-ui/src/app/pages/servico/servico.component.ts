import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ServicoService } from 'src/app/providers';
import { Paginacao, Servico, Pagina } from 'src/app/models';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.scss']
})
export class ServicoComponent implements OnInit {

  public carregando: boolean
  public servicos: Paginacao<Servico>
  private paginaAtual: Pagina = { page: 0 }

  constructor(
    private service: ServicoService,
    private mensagem: ToastrService 
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar(pagina?: Pagina) {
    this.paginaAtual = pagina || this.paginaAtual
    this.carregando = true
    this.service.listarPaginado(this.paginaAtual).subscribe(
      resultado => this.servicos = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar listar os serviços')
      },
      () => this.carregando = false
    )
  }

  confirmarExcluir(servico: Servico) {
    Swal.fire({
      title: 'Atenção',
      text: `Todos os pedidos, históricos de preço e promoçõe do serviço ${servico.descricao} serão perdidos durante a exclusão, deseja continuar?`,
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
        this.excluir(servico)
      }
    })
  }

  private excluir(servico: Servico) {
    this.service.excluir(servico.id).subscribe(
      () => {
        this.mensagem.success(`Serviço ${servico.descricao} excluído com sucesso`)
        this.listar()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar excluir esse serviço')
      }
    )
  }

}
