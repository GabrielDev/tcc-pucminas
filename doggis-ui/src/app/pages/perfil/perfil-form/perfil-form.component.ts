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
  @Input('exibir') exibir: Subject<Perfil>
  @Output() onSalvar = new EventEmitter<Perfil>()
  @ViewChild('perfilModal') 
  private modalTemplate: TemplateRef<any>
  private modal: any

  public perfilForm: FormGroup
  public papeis: Papel[] = []
  public perfil: Perfil
  public papeisSelecionados: Papel[] = []

  constructor(
    private formBuilder: FormBuilder,
    private service: PerfilService,
    private mensagem: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.gerarForm()
    this.exibir.subscribe(perfil => this.abrir(perfil))
  }

  get f() {
    return this.perfilForm.controls
  }

  abrir(perfil: Perfil) {
    if(perfil) {
      this.perfil = perfil
      this.papeisSelecionados = perfil.papeis
      this.perfilForm.setValue(perfil)
    }

    this.listarPapeis()
    this.modal = this.modalService.open(this.modalTemplate, { windowClass: 'modal-mini', size: 'lg', centered: true })
  }

  selecionar() {
    this.f.papeis.setValue(this.papeisSelecionados)
  }

  private gerarForm() {
    this.perfilForm = this.formBuilder.group({
      id: [],
      descricao: ['', Validators.required],
      papeis: [[], Validators.required],
      dataInclusao: []
    })
  }

  private listarPapeis() {
    this.service.listarPapeis().subscribe(
      resultado => {
        this.papeis = resultado.filter(papel => !this.papeisSelecionados.some(selecionado => selecionado.id === papel.id))
      },
      console.warn
    )
  }

  salvar() {
    if(this.perfilForm.valid) {
      this.perfil = this.perfilForm.value
      
      if(this.perfil.id) {
        this.editar()
      } else {
        this.criar()
      }
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
      },
      () => this.modal.close()
    )
  }

  private editar() {
    this.service.editar(this.perfil.id, this.perfil).subscribe(
      result => {
        this.mensagem.success(`Perfil ${result.descricao} alterado com sucesso!`)
        this.onSalvar.emit(result)
      },
      error => {
        console.warn(error)
        this.mensagem.error('Ocorreu um erro ao tentar editar esse perfil')
      },
      () => this.modal.close()
    )
  }
}
