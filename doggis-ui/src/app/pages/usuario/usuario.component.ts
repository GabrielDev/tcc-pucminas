import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/providers';
import { Paginacao, Usuario, Pagina } from 'src/app/models';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  public carregando: boolean
  public usuarios: Paginacao<Usuario>
  private paginaAtual: Pagina = { page: 0 }

  constructor(
    private service: UsuarioService,
    private mensagem: ToastrService 
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar(pagina: Pagina = this.paginaAtual) {
    this.paginaAtual = pagina
    this.carregando = true
    this.service.listarPaginado(this.paginaAtual).subscribe(
      resultado => this.usuarios = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar listar usuários')
      },
      () => this.carregando = false
    )
  }

  confirmarExcluir(usuario: Usuario) {
    Swal.fire({
      title: 'Atenção',
      text: 'Todos os atendimentos, agendamentos, pedidos, históricos e promoçōes desse usuário serão perdidos durante a exclusão, deseja continuar?',
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
        this.excluir(usuario)
      }
    })
  }

  private excluir(usuario: Usuario) {
    this.service.excluir(usuario.id).subscribe(
      () => {
        this.mensagem.success(`${usuario.nome} excluído com sucesso`)
        this.listar()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar excluir esse usuário')
      }
    )
  }

}
