import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { FabricanteService } from 'src/app/providers';
import { Fabricante, Paginacao, Pagina } from 'src/app/models';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.scss']
})
export class FabricanteComponent implements OnInit {

  public fabricantes: Paginacao<Fabricante>
  public abrirModal: Subject<Fabricante> = new Subject()
  private paginaAtual: Pagina = { page: 0 }

  constructor(
    private service: FabricanteService,
    private mensagem: ToastrService
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar(pagina: Pagina = this.paginaAtual) {
    this.paginaAtual = pagina
    this.service.listarPaginado(this.paginaAtual).subscribe(
      resultado => this.fabricantes = resultado,
      console.warn
    )
  }

  confirmarExcluir(fabricante: Fabricante) {
    Swal.fire({
      title: 'Atenção',
      text: 'Todos os produtos desse fabricante serão perdidos durante a exclusão, deseja continuar?',
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
        this.excluir(fabricante)
      }
    })
  }

  private excluir(fabricante: Fabricante) {
    this.service.excluir(fabricante.id).subscribe(
      () => {
        this.mensagem.success(`Fabricante ${fabricante.nome} foi excluído`)
        this.listar()
      },
      console.warn
    )
  }

  alterar(fabricante: Fabricante) {
    this.abrirModal.next(fabricante)
  }

  novo() {
    this.abrirModal.next()
  }
}
