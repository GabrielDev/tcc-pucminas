import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models';
import { CategoriaService } from 'src/app/providers';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  public categorias: Categoria[] = []
  public abrirModal: Subject<Categoria> = new Subject()

  constructor(
    private service: CategoriaService,
    private mensagem: ToastrService
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar() {
    this.service.listar().subscribe(
      resultado => this.categorias = resultado,
      console.warn
    )
  }

  excluir(categoria: Categoria) {
    this.service.excluir(categoria.id).subscribe(
      () => {
        this.mensagem.success(`Categoria ${categoria.descricao} foi excluída`)
        this.categorias = this.categorias.filter(item => item.id != categoria.id)
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
