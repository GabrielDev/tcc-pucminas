import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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

  excluir(fabricante: Fabricante) {
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
