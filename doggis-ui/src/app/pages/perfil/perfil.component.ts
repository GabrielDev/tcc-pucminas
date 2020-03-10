import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from 'src/app/models';
import { PerfilService } from 'src/app/providers';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public perfis: Perfil[] = []
  public abrirModal: Subject<Perfil> = new Subject()

  constructor(
    private service: PerfilService,
    private mensagem: ToastrService
  ) { }

  ngOnInit() {
    this.listar()
  }

  listar() {
    this.service.listar().subscribe(
      resultado => this.perfis = resultado,
      console.warn
    )
  }

  excluir(perfil: Perfil) {
    this.service.excluir(perfil.id).subscribe(
      resultado => {
        this.mensagem.success(`Perfil ${perfil.descricao} foi excluído`)
        this.perfis = this.perfis.filter(item => item.id != perfil.id)
      },
      console.warn
    )
  }

  alterar(perfil: Perfil) {
    this.abrirModal.next(perfil)
  }

  novo() {
    this.abrirModal.next()
  }
}
