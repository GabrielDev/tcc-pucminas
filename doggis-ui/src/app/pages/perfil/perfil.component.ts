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
      result => this.perfis = result,
      console.warn
    )
  }

  desativar(perfil: Perfil) {
    this.service.desativar(perfil).subscribe(
      result => this.mensagem.success(`Perfil ${perfil.descricao} foi desativado`),
      console.warn
    )
  }

  ativar(perfil: Perfil) {
    this.service.ativar(perfil).subscribe(
      result => this.mensagem.success(`Perfil ${perfil.descricao} foi desativado`),
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
