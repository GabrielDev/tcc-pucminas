import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService, ClienteService } from 'src/app/providers';
import { Pedido, Agenda, Agendamento, Cliente, Servico, CalendarioTraducao, Usuario } from 'src/app/models';
import { debounceTime, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-pedido-agenda',
  templateUrl: './pedido-agenda.component.html',
  styleUrls: ['./pedido-agenda.component.scss']
})
export class PedidoAgendaComponent implements OnInit, OnDestroy {

  @Input('pedido') pedido: Pedido

  @Input('exibir') 
  servicoInput: Subject<Servico>

  @Output() 
  onSalvar = new EventEmitter<Servico>()

  @Output() 
  onSelecionarCliente = new EventEmitter<Cliente>()

  @ViewChild('agendaModal') 
  private modalTemplate: TemplateRef<any>
  private modal: any
  private buscaCliente$ = new Subject<string>()

  public agendaForm: FormGroup
  public agenda: Agenda
  public clientes: Cliente[]
  public disponiveis: Agendamento[] = []
  public dataInicio: Date = new Date()
  public pt = CalendarioTraducao;

  constructor(
    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private clienteService: ClienteService,
    private mensagem: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.gerarForm()
    this.definirBuscas()
    this.servicoInput.subscribe(servico => this.abrir(servico))
  }

  ngOnDestroy() {
    this.buscaCliente$.unsubscribe()
  }

  get f() {
    return this.agendaForm.controls
  }

  abrir(servico: Servico) {
    this.agendaForm.reset()
    if(servico) {
      this.f.servico.setValue(servico)
    }

    this.selecionarCliente(this.pedido.cliente)

    this.modal = this.modalService.open(this.modalTemplate, { windowClass: 'modal-mini', size: 'xl', centered: true })
  }

  buscarClientes(event) {
    const termo = event.query
    this.buscaCliente$.next(termo)
  }

  listarDisponiveis() {
    let { servico, dia } = this.f
    this.agendaService.listarDisponiveis(servico.value, dia.value)
        .subscribe(
          resultados => this.aplicarHorarios(resultados),
          console.warn
        )
  }

  incluirCliente() {
    this.selecionarCliente(this.f.cliente.value)
    this.onSelecionarCliente.next(this.f.cliente.value)
  }

  private selecionarCliente(cliente: Cliente) {
    if(cliente) {
      this.f.cliente.setValue(cliente)

      if(cliente.pets.length == 1) {
        this.f.pet.setValue(cliente.pets[0])
      }
    }
  }

  selecionarHorario(horario: Date, usuario: Usuario) {
    console.log(horario);
    console.log(usuario);
    
    this.f.dataAgenda.setValue(horario)
    this.f.usuario.setValue(usuario)
  }

  salvar() {
    if(this.agendaForm.valid) {
      this.agenda = this.agendaForm.value
      this.agendaForm.disable()
      this.criar()
    }
  }

  private criar() {
    this.agendaService.salvar(this.agenda).subscribe(
      resultado => {
        this.mensagem.success(`${this.agenda.servico.descricao} agendado com sucesso!`)
        this.onSalvar.emit(this.agenda.servico)
      },
      error => {
        console.warn(error)
        this.mensagem.error('Ocorreu um erro ao tentar agendar esse serviço')
      },
      () => {
        this.agendaForm.enable()
        this.modal.close()
      }
    )
  }

  private gerarForm() {
    this.agendaForm = this.formBuilder.group({
      id: [],
      usuario: [null, Validators.required],
      cliente: [null, Validators.required],
      pet: [null, Validators.required],
      servico: [null, Validators.required],
      dia: [null, Validators.required],
      dataAgenda: [null, Validators.required],
      dataInclusao: []
    })

  }

  private definirBuscas() {
    this.buscaCliente$
        .pipe(debounceTime(400))
        .pipe(switchMap(termo =>  this.clienteService.buscar(termo)))
        .subscribe(
          resultado => this.clientes = resultado,
          console.warn
        )
  }

  private aplicarHorarios(resultados: Agendamento[] = []) {
    this.disponiveis = resultados.map(item => {
      item.disponiveis = item.disponiveis.map(horario => new Date(horario))
      item.marcados = item.marcados.map(horario => new Date(horario))
      return item
    })
  }

}