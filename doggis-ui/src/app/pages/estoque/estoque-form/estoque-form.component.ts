import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstoqueService } from 'src/app/providers';
import { Estoque } from 'src/app/models';

@Component({
  selector: 'app-estoque-form',
  templateUrl: './estoque-form.component.html',
  styleUrls: ['./estoque-form.component.scss']
})
export class EstoqueFormComponent implements OnInit {

  @Input('exibir') 
  exibir: Subject<Estoque>

  @Output() 
  onSalvar = new EventEmitter<Estoque>()

  @ViewChild('estoqueModal') 
  private modalTemplate: TemplateRef<any>
  private modal: any

  public estoqueForm: FormGroup
  private estoque: Estoque

  constructor(
    private modalService: NgbModal,
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private estoqueService: EstoqueService,
  ) { }

  ngOnInit(): void {
    this.gerarForm()
    this.exibir.subscribe(estoque => this.abrir(estoque))
  }

  get f() {
    return this.estoqueForm.controls
  }

  abrir(estoque: Estoque) {
    if(estoque) {
      this.estoque = estoque
      this.estoqueForm.setValue(estoque)
    }

    this.modal = this.modalService.open(this.modalTemplate, { windowClass: 'modal-mini', size: 'lg', centered: true })
  }

  salvar() {
    if(this.estoqueForm.valid) {
      this.estoque = this.estoqueForm.value

      if(this.estoque.id) {
        this.editar()
      } else {
        this.criar()
      }
    }
  }

  private criar() {
    this.estoqueService.salvar(this.estoque).subscribe(
      () => this.mensagem.success(`Estoque do produto ${this.estoque.produto.descricao} salvo com sucesso!`),
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse estoque')
      },
      () => this.modal.close()
    )
  }

  private editar() {
    this.estoqueService.salvar(this.estoque).subscribe(
      () => this.mensagem.success(`Estoque do produto ${this.estoque.produto.descricao} salvo com sucesso!`),
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse estoque')
      },
      () => this.modal.close()
    )
  }

  private gerarForm() {
    this.estoqueForm = this.formBuilder.group({
      id: [],
      usuario: [],
      saldo: [],
      dataInclusao: [],
      produto: [null, Validators.required],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      tipo: [null, Validators.required]
    })
  }
}
