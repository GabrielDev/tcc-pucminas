import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Pedido, ItemVenda, TipoItem, PedidoItem, Servico } from 'src/app/models';

@Component({
  selector: 'app-pedido-desconto',
  templateUrl: './pedido-desconto.component.html',
  styleUrls: ['./pedido-desconto.component.scss']
})
export class PedidoDescontoComponent implements OnInit {
  
  @Input('exibir') 
  exibir: Subject<Pedido>
  
  @Output() 
  onSalvar = new EventEmitter<Pedido>()

  @ViewChild('descontoModal') 
  private modalTemplate: TemplateRef<any>
  private modal: any

  public pedido: Pedido
  public servicos: PedidoItem[] = []
  public selecionados: PedidoItem[] = []
  public patazDesconto: number = 0
  public totalDesconto: number = 0
  public totalServicos: number = 0

  constructor(
    private mensagem: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.exibir.subscribe(pedido => this.abrir(pedido))
  }

  abrir(pedido: Pedido) {
    this.patazDesconto = this.totalDesconto = this.totalServicos = 0
    this.servicos = this.selecionados = []

    if(pedido) {
      this.pedido = pedido
      this.servicos = pedido.itens
                            .filter(pedidoItem => pedidoItem.item.tipo == TipoItem.SERVICO)
                            .map(servico => this.removerDesconto(servico))
      this.modal = this.modalService.open(this.modalTemplate, { windowClass: 'modal-mini', size: 'xl', centered: true })
    }
  }

  selecionar(servico: PedidoItem, event: any) {
    if(event.target.checked) {
      this.adicionar(servico, event)
    } else {
      this.remover(servico)
    }
  }

  private adicionar(servico: PedidoItem, event: any) {
    let saldo = this.pedido.cliente.totalPataz - this.patazDesconto
    let permiteAdicao = saldo >= (servico.item as Servico).patazDesconto 

    if(permiteAdicao) {
      this.selecionados.push(servico)
      this.calcular()
    } else {
      this.mensagem.warning(`Saldo de Pataz insuficiente para aplicar nesse serviço`)
      event.target.checked = false
    }
  }

  private remover(servico: PedidoItem) {
    this.removerDesconto(servico)
    this.selecionados = this.selecionados.filter(pedidoItem => pedidoItem.item.id != servico.item.id)
    this.calcular()
  }

  private removerDesconto(servico: PedidoItem): PedidoItem {
    servico.patazDescontoTotal = 0
    servico.precoDesconto = 0
    servico.precoTotal = servico.precoSubtotal
    return servico
  }

  private calcular() {
    let saldo = this.pedido.cliente.totalPataz
    this.patazDesconto = this.totalDesconto = this.totalServicos = 0

    this.selecionados = this.selecionados.map(servico => {
      let qtde = 0
      const desconto = (servico.item as Servico).patazDesconto
      while (saldo >= desconto && qtde < servico.quantidade) {
        saldo -= desconto
        qtde++
      }
      servico.precoDesconto = servico.precoUnitario * qtde
      servico.patazDescontoTotal = desconto * qtde
      servico.precoTotal = servico.precoSubtotal - servico.precoDesconto
      this.totalServicos += qtde
      this.totalDesconto += servico.precoDesconto
      this.patazDesconto += servico.patazDescontoTotal

      return servico
    })
  }

  salvar() {
    this.pedido.patazDescontoTotal = this.patazDesconto
    this.onSalvar.next(this.pedido)
    this.modal.close()
  }

  cancelar() {
    this.servicos = this.servicos.map(servico => this.removerDesconto(servico))
    this.selecionados = []
    this.calcular()
    this.pedido.patazDescontoTotal = this.patazDesconto
    this.onSalvar.next(this.pedido)
    this.modal.close()
  }
  
  percentualDesconto() {
    return (this.totalDesconto / this.pedido.subtotal * 100).toFixed(2)
  }
}
