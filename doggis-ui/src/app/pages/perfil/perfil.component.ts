import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
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

  confirmarExcluir(perfil: Perfil) {
    Swal.fire({
      title: 'Atenção',
      text: 'Todos os usuários associados a esse perfil serão perderão suas autorizaçōes durante a exclusão, deseja continuar?',
      icon: 'question',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-default',
        cancelButton: 'btn btn-outline-secondary'
      }
    }).then(({ value }) => {
      if(value) {
        this.excluir(perfil)
      }
    })
  }

  private excluir(perfil: Perfil) {
    this.service.excluir(perfil.id).subscribe(
      () => {
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
