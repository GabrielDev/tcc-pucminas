import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  excluir(cliente: Cliente) {
    this.service.excluir(cliente.id).subscribe(
      () => this.mensagem.success(`Cliente ${cliente.nome} excluído com sucesso`),
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar excluir esse cliente')
      }
    )
  }

}
