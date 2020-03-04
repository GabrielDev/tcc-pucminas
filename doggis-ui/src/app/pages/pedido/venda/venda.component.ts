import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente, ItemVenda, Pagamento, TipoItem, Pedido, PedidoItem } from 'src/app/models';
import { PedidoService, ClienteService } from 'src/app/providers';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {

  public pedido: Pedido
  public pedidoForm: FormGroup
  public clientes: Cliente[]
  public itensPedido: ItemVenda[]
  public itensVenda: ItemVenda[]
  public pagamentos: Pagamento[]

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private mensagem: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.gerarForm()
    this.obterPagamentos()
  }

  teste() {
    this.mensagem.success('Teste')
  }

  private gerarForm() {
    this.pedidoForm = this.formBuilder.group({
      cliente: [null, Validators.required],
      itens: this.formBuilder.group({
       quantidade: [1, [Validators.required, Validators.min(1)]],
       item: [null, Validators.required]
      }),
      pagamento: [null, Validators.required]
    })
  }

  f() {
    return this.pedidoForm.controls
  }

  buscarClientes(event) {
    const termo = event.query
    this.clienteService.buscar(termo).subscribe(
      resultado => this.clientes = resultado,
      console.warn
    )
  }

  buscarItensVenda(termo: string) {
    this.pedidoService.buscar(termo).subscribe(
      resultado => this.itensVenda = resultado,
      console.warn
    )
  }

  adicionar(item: ItemVenda) {
    let pedidoItem: PedidoItem = {
      id: 0,
      item,
      quantidade: 1,
      precoUnitario: item.valor,
      precoTotal: item.valor,
      patazBonusTotal: (item.tipo ==  TipoItem.SERVICO)? item.patazBonus: 0,
    }

    this.pedido.itens.push(pedidoItem)
    this.calcularTotal()
  }

  remover(item: ItemVenda) {
    this.pedido.itens = this.pedido.itens.filter(pedidoItem => pedidoItem.item.id != item.id)
    this.calcularTotal()
  }

  atualizarQuantidade(pedidoItem: PedidoItem) {
    if(pedidoItem.item.tipo == TipoItem.PRODUTO) {
      this.validarEstoque(pedidoItem)
    }

    pedidoItem.precoTotal = pedidoItem.precoUnitario * pedidoItem.quantidade
    this.calcularTotal()
  }
  
  private validarEstoque(pedidoItem: PedidoItem) {
    if(pedidoItem.quantidade > pedidoItem.item.totalEstoque) {
      this.mensagem.warning(`Estoque disponível para esse item: ${pedidoItem.item.totalEstoque}`)
      pedidoItem.quantidade = pedidoItem.item.totalEstoque
    }
  }

  private calcularTotal() {
    this.pedido.total = this.pedido.itens.reduce((total, item) => total += item.precoTotal, 0)
  }

  obterPagamentos() {
    this.pedidoService.listarPagamentos().subscribe(
      resultado => this.pagamentos = resultado,
      console.warn
    )
  }

  finalizar() {
    if(this.isValido()) {
      this.pedidoService.salvar(this.pedido).subscribe(
        resultado => {
          console.log(resultado)
          this.mensagem.success(`Pedido no. ${resultado.id} efetuado com sucesso!`)
          this.router.navigate(['/pedido'])
        },
        error => {
          console.warn(error)
          this.mensagem.error('Ocorreu um erro ao tentar efetuar o pedido')
        }
      )
    }
  }
  
  private isValido(): boolean {
    let { cliente, itens, pagamento } = this.pedido
    let isInvalido = (!cliente || !itens.length || !pagamento)
    let alertas = 'Não foi possível concluir seu pedido devido a(s) seguinte(s) pendência(s): \n'

    if(!cliente) {
      alertas += `- Cliente não selecionado \n`
    }

    if(!itens.length) {
      alertas += `- Nenhum item foi adicionado \n`
    }

    if(!pagamento) {
      alertas += `- Pagamento não selecionado \n`
    }

    if(isInvalido) {
      this.mensagem.error(alertas)
    }

    return !isInvalido
  }
}
