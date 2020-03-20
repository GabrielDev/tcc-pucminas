import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ClienteService } from 'src/app/providers';
import { Paginacao, Cliente, Pagina } from 'src/app/models';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public clientes: Paginacao<Cliente>
  private paginaAtual: Pagina = { page: 0 }

  constructor(
    private service: ClienteService,
    private mensagem: ToastrService 
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar(pagina: Pagina = this.paginaAtual) {
    this.paginaAtual = pagina
    this.service.listarPaginado(this.paginaAtual).subscribe(
      resultado => this.clientes = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar listar clientes')
      }
    )
  }

  confirmarExcluir(cliente: Cliente) {
    Swal.fire({
      title: 'Atenção',
      text: `Todos os pets, agendamentos, avaliaçōes e pedidos do cliente ${cliente.nome} serão perdidos durante a exclusão, deseja continuar?`,
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
        this.excluir(cliente)
      }
    })
  }

  private excluir(cliente: Cliente) {
    this.service.excluir(cliente.id).subscribe(
      () => this.mensagem.success(`Cliente ${cliente.nome} excluído com sucesso`),
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar excluir esse cliente')
      }
    )
  }

}
