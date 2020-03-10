import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FabricanteService } from 'src/app/providers';
import { Fabricante } from 'src/app/models';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.scss']
})
export class FabricanteComponent implements OnInit {

  public fabricantes: Fabricante[] = []
  public abrirModal: Subject<Fabricante> = new Subject()

  constructor(
    private service: FabricanteService,
    private mensagem: ToastrService
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar() {
    this.service.listar().subscribe(
      resultado => this.fabricantes = resultado,
      console.warn
    )
  }

  excluir(fabricante: Fabricante) {
    this.service.excluir(fabricante.id).subscribe(
      () => {
        this.mensagem.success(`Fabricante ${fabricante.descricao} foi excluído`)
        this.fabricantes = this.fabricantes.filter(item => item.id != fabricante.id)
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
