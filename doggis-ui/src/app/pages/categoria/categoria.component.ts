import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Categoria, Pagina, Paginacao } from 'src/app/models';
import { CategoriaService } from 'src/app/providers';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  public categorias: Paginacao<Categoria>
  public abrirModal: Subject<Categoria> = new Subject()
  private paginaAtual: Pagina = { page: 0 }

  constructor(
    private service: CategoriaService,
    private mensagem: ToastrService
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar(pagina: Pagina = this.paginaAtual) {
    this.paginaAtual = pagina
    this.service.listarPaginado(this.paginaAtual).subscribe(
      resultado => this.categorias = resultado,
      console.warn
    )
  }

  confirmarExcluir(categoria: Categoria) {
    Swal.fire({
      title: 'Atenção',
      text: 'Todos os produtos dessa categoria serão perdidos durante a exclusão, deseja continuar?',
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
        this.excluir(categoria)
      }
    })
  }

  private excluir(categoria: Categoria) {
    this.service.excluir(categoria.id).subscribe(
      () => {
        this.mensagem.success(`Categoria ${categoria.descricao} foi excluída`)
        this.listar()
      },
      console.warn
    )
  }

  alterar(categoria: Categoria) {
    this.abrirModal.next(categoria)
  }

  novo() {
    this.abrirModal.next()
  }
}
