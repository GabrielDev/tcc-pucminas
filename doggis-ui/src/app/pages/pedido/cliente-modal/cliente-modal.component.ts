import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteValidadorService } from '../../cliente/cliente.validador.service';
import { ClienteService, EstadoService } from 'src/app/providers';
import { Estado, Cliente } from 'src/app/models';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.scss'],
  providers: [ClienteValidadorService],
})
export class ClienteModalComponent implements OnInit {

  @Input('exibir')
  exibir: Subject<Cliente>
  @Output()
  onSalvar = new EventEmitter<Cliente>()

  @ViewChild('clienteModal')
  private modalTemplate: TemplateRef<any>
  private modal: any

  public estados: Estado[] = []
  public clienteForm: FormGroup
  public cliente: Cliente

  constructor(
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private validadorService: ClienteValidadorService,
    private clienteService: ClienteService,
    private estadoService: EstadoService
  ) { }

  ngOnInit(): void {
    this.gerarForm()
    this.exibir.subscribe(cliente => this.abrir(cliente))
  }

  abrir(cliente: Cliente) {
    this.clienteForm.reset()
    this.listarEstado()

    if(cliente) {
      this.cliente = cliente
      this.clienteForm.setValue(cliente)
    }
    
    this.deveValidarCpf()
    this.modal = this.modalService.open(this.modalTemplate, { windowClass: 'modal-mini', size: 'xl', centered: true })
  }

  get f() {
    return this.clienteForm.controls
  }

  listarEstado() {
    this.estadoService.listar().subscribe(
      resultado => this.estados = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter os estados')
      }
    )
  }

  deveValidarCpf() {
    let { cpf } = this.f
    if(this.cliente?.id) {
      if(cpf.value == this.cliente.cpf) {
        cpf.clearAsyncValidators()
      } else {
        cpf.setAsyncValidators(this.validadorService.verificarCpf())
      }
      cpf.updateValueAndValidity()
    }
  }

  aplicarFoto(foto: string) {
    this.f.foto.setValue(foto)
  }

  salvar() {
    this.clienteForm.markAllAsTouched()
    if(this.clienteForm.valid) {
      this.cliente = this.clienteForm.value

      if(this.cliente.id) {
        this.editar()
      } else {
        this.criar()
      }
    }
  }

  private criar() {
    this.clienteService.salvar(this.cliente).subscribe(
      resultado => {
        this.cliente = resultado
        this.mensagem.success(`Cliente ${this.cliente.nome} salvo com sucesso!`)
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse cliente')
      },
      () => {
        this.clienteForm.reset()
        this.onSalvar.emit(this.cliente)
        this.modal.close()
      }
    )
  }

  private editar() {
    this.clienteService.salvar(this.cliente).subscribe(
      resultado => {
        this.cliente = resultado
        this.mensagem.success(`Cliente ${this.cliente.nome} salvo com sucesso!`)
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse cliente')
      },
      () => {
        this.clienteForm.reset()
        this.onSalvar.emit(this.cliente)
        this.modal.close()
      }
    )
  }

  private gerarForm() {
    this.clienteForm = this.formBuilder.group({
      id: [],
      nome: [null, [
        Validators.required, 
        Validators.minLength(3)
      ]],
      email: [null, [
        Validators.required, 
        Validators.email
      ]],
      foto: [],
      cpf: [null, 
        [
          Validators.required,
          Validators.minLength(14)
        ],
        this.validadorService.verificarCpf()
      ],
      rg: [null, [
        Validators.required, 
        Validators.maxLength(15)
      ]],
      endereco: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
      pets: [[]],
      totalPataz: [],
      dataInclusao: [],
      isAutorizaFoto: [false, Validators.required],
    })
  }

  comparador(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
