import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/providers';
import { Paginacao, Usuario, Pagina } from 'src/app/models';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

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
    this.service.listarPaginado(this.paginaAtual).subscribe(
      resultado => this.usuarios = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar listar usuários')
      }
    )
  }

  excluir(usuario: Usuario) {
    this.service.excluir(usuario.id).subscribe(
      () => this.mensagem.success(`${usuario.nome} excluído com sucesso`),
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar excluir esse usuário')
      }
    )
  }

}
