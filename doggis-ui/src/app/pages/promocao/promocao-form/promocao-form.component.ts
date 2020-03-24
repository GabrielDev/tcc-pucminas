import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Promocao, ItemVenda, TipoItem, Produto, Servico } from 'src/app/models';
import { PromocaoService, PedidoService } from 'src/app/providers';

@Component({
  selector: 'app-promocao-form',
  templateUrl: './promocao-form.component.html',
  styleUrls: ['./promocao-form.component.scss']
})
export class PromocaoFormComponent implements OnInit {

  @Input('exibir') 
  exibir: Subject<Promocao>

  @Output() 
  onSalvar = new EventEmitter<Promocao>()

  @ViewChild('promocaoModal') 
  private modalTemplate: TemplateRef<any>
  private modal: any

  public promocaoForm: FormGroup
  public itens: ItemVenda[] = []
  public dataInicio: Date = new Date()
  private promocao: Promocao

  constructor(
    private modalService: NgbModal,
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private promocaoService: PromocaoService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.gerarForm()
    this.exibir.subscribe(promocao => this.abrir(promocao))
  }

  get f() {
    return this.promocaoForm.controls
  }

  abrir(promocao: Promocao) {
    this.promocaoForm.reset()
    if(promocao) {
      this.promocao = promocao
      this.promocaoForm.setValue({...promocao, periodo:[new Date(promocao.inicio), new Date(promocao.fim)]})
    }

    this.modal = this.modalService.open(this.modalTemplate, { windowClass: 'modal-mini', size: 'lg', centered: true })
  }

  buscar(event) {
    const termo = event.query
    this.pedidoService.buscar(termo).subscribe(
      resultado => this.itens = resultado,
      console.warn
    )
  }

  definirData() {
    let { inicio, fim, periodo } = this.f
    let [dataInicio, dataFim] = periodo.value
    
    if(dataInicio) {
      inicio.setValue(dataInicio)
    }

    if(dataFim) {
      fim.setValue(dataFim)
    }
  }

  salvar() {
    this.promocaoForm.markAllAsTouched()
    if(this.promocaoForm.valid) {
      this.promocao = this.promocaoForm.value

      if(this.promocao.item.tipo == TipoItem.PRODUTO) {
        this.promocao.produto = <Produto> this.promocao.item
      } else {
        this.promocao.servico = <Servico> this.promocao.item
      }

      if(this.promocao.id) {
        this.editar()
      } else {
        this.criar()
      }
    } else {
      this.promocaoForm.markAllAsTouched()
    }
  }

  private criar() {
    this.promocaoService.salvar(this.promocao).subscribe(
      () => {
        this.mensagem.success(`Promoção ${this.promocao.item.descricao} salva com sucesso!`)
        this.promocaoForm.reset()
        this.onSalvar.emit()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar essa promoção')
      },
      () => this.modal.close()
    )
  }

  private editar() {
    this.promocaoService.editar(this.promocao.id, this.promocao).subscribe(
      () => {
        this.mensagem.success(`Promoção ${this.promocao.item.descricao} salvo com sucesso!`)
        this.promocaoForm.reset()
        this.onSalvar.emit()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar essa promoção')
      },
      () => this.modal.close()
    )
  }

  private gerarForm() {
    this.promocaoForm = this.formBuilder.group({
      id: [],
      usuario: [],
      produto: [],
      servico: [],
      item: [null, Validators.required],
      desconto: [null, [Validators.required, Validators.min(1)]],
      inicio: [null, Validators.required],
      fim: [null, Validators.required],
      periodo: [null, Validators.required]
    })
  }
}
