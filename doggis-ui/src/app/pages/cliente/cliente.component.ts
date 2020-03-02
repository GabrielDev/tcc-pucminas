import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/providers';
import { Paginacao, Cliente } from 'src/app/models';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public clientes: Paginacao<Cliente>

  constructor(
    private service: ClienteService,
    private mensagem: ToastrService 
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar() {
    this.service.listarPaginado().subscribe(
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
