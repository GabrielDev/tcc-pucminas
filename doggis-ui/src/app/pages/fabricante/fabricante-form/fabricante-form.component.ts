import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FabricanteService } from 'src/app/providers';
import { Fabricante } from 'src/app/models';

@Component({
  selector: 'app-fabricante-form',
  templateUrl: './fabricante-form.component.html',
  styleUrls: ['./fabricante-form.component.scss']
})
export class FabricanteFormComponent implements OnInit {
  @Input('exibir') exibir: Subject<Fabricante>
  @Output() onSalvar = new EventEmitter<Fabricante>()
  @ViewChild('fabricanteModal') 
  private modalTemplate: TemplateRef<any>
  private modal: any

  public fabricanteForm: FormGroup
  public fabricante: Fabricante

  constructor(
    private formBuilder: FormBuilder,
    private service: FabricanteService,
    private mensagem: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.gerarForm()
    this.exibir.subscribe(fabricante => this.abrir(fabricante))
  }

  get f() {
    return this.fabricanteForm.controls
  }

  abrir(fabricante: Fabricante) {
    if(fabricante) {
      this.fabricante = fabricante
      this.fabricanteForm.setValue(fabricante)
    }

    this.modal = this.modalService.open(this.modalTemplate, { windowClass: 'modal-mini', size: 'lg', centered: true })
  }

  private gerarForm() {
    this.fabricanteForm = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      dataInclusao: []
    })
  }

  salvar() {
    this.fabricanteForm.markAllAsTouched()
    if(this.fabricanteForm.valid) {
      this.fabricante = this.fabricanteForm.value
      
      if(this.fabricante.id) {
        this.editar()
      } else {
        this.criar()
      }
    }
  }

  private criar() {
    this.service.salvar(this.fabricante).subscribe(
      resultado => {
        this.mensagem.success(`Fabricante ${resultado.nome} salvo com sucesso!`)
        this.onSalvar.emit(resultado)
      },
      error => {
        console.warn(error)
        this.mensagem.error('Ocorreu um erro ao tentar salvar esse fabricante')
      },
      () => this.modal.close()
    )
  }

  private editar() {
    this.service.editar(this.fabricante.id, this.fabricante).subscribe(
      resultado => {
        this.mensagem.success(`Fabricante ${resultado.nome} alterado com sucesso!`)
        this.onSalvar.emit(resultado)
      },
      error => {
        console.warn(error)
        this.mensagem.error('Ocorreu um erro ao tentar editar esse fabricante')
      },
      () => this.modal.close()
    )
  }
}
