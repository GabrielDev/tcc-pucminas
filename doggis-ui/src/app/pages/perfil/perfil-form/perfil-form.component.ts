import { Component, OnInit, Output, Input, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Perfil, Papel } from 'src/app/models';
import { PerfilService } from 'src/app/providers';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss'],
})
export class PerfilFormComponent implements OnInit {
  @Input() exibir: Subject<Perfil>
  @Output() onSalvar = new EventEmitter<Perfil>()
  @ViewChild('perfilModal') 
  private modal: TemplateRef<any>

  public perfilForm: FormGroup
  public papeis: Papel[] = []
  public perfil: Perfil

  constructor(
    private formBuilder: FormBuilder,
    private service: PerfilService,
    private mensagem: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log(this.modal);
    this.gerarForm()
    this.listarPapeis()
    this.exibir.subscribe(perfil => this.abrir(perfil))
  }

  abrir(perfil: Perfil) {
    this.perfil = perfil
    this.modalService.open(this.modal, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then(
      console.log,
      console.warn
    )
  }

  f() {
    return this.perfilForm.controls
  }

  private gerarForm() {
    this.perfilForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      papeis: [[], Validators.required]
    })
  }

  private listarPapeis() {
    this.service.listarPapeis().subscribe(
      result => this.papeis = result,
      console.warn
    )
  }

  salvar() {
    if(this.perfil.id) {
      this.editar()
    } else {
      this.criar()
    }
  }

  private criar() {
    this.service.salvar(this.perfil).subscribe(
      result => {
        this.mensagem.success(`Perfil ${result.descricao} salvo com sucesso!`)
        this.onSalvar.emit(result)
      },
      error => {
        console.warn(error)
        this.mensagem.error('Ocorreu um erro ao tentar salvar esse perfil')
      }
    )
  }

  private editar() {
    this.service.editar(this.perfil).subscribe(
      result => {
        this.mensagem.success(`Perfil ${result.descricao} alterado com sucesso!`)
        this.onSalvar.emit(result)
      },
      error => {
        console.warn(error)
        this.mensagem.error('Ocorreu um erro ao tentar editar esse perfil')
      }
    )
  }
}
