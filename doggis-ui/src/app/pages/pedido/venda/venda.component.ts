import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Cliente, ItemVenda, Pagamento, TipoItem, Pedido, PedidoItem, Produto, Servico, Promocao } from 'src/app/models';
import { PedidoService, ClienteService, ProdutoService, ServicoService } from 'src/app/providers';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit, OnDestroy {

  public pedido: Pedido = new Pedido()
  public clientes: Cliente[]
  public itensPedido: ItemVenda[]
  public itensVenda: ItemVenda[]
  public pagamentos: Pagamento[]
  public pagamentoSelecionado: number
  public itemSugerido: ItemVenda
  public abrirModal: Subject<Cliente> = new Subject()

  private buscaItem$ = new Subject<string>()
  private buscaCliente$ = new Subject<string>()

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private servicoService: ServicoService,
    private mensagem: ToastrService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.listarPagamentos()
    this.definirBuscas()
  }

  ngOnDestroy() {
    this.buscaItem$.unsubscribe()
    this.buscaCliente$.unsubscribe()
  }

  get p() {
    return this.pedido
  }

  novoCliente() {
    this.abrirModal.next()
  }

  adicionarCliente(cliente: Cliente) {
    this.pedido.cliente = cliente
  }

  buscarClientes(event) {
    const termo = event.query
    this.buscaCliente$.next(termo)
  }

  buscarItensVenda(event) {
    const termo = event.query
    this.buscaItem$.next(termo)
  }

  private definirBuscas() {
    this.buscaItem$
        .pipe(debounceTime(400))
        .pipe(switchMap(termo => this.pedidoService.buscar(termo)))
        .subscribe(
          resultado => this.itensVenda = resultado,
          console.warn
        )

    this.buscaCliente$
        .pipe(debounceTime(400))
        .pipe(switchMap(termo =>  this.clienteService.buscar(termo)))
        .subscribe(
          resultado => this.clientes = resultado,
          console.warn
        )
  }

  listarPagamentos() {
    this.pedidoService.listarPagamentos().subscribe(
      resultado => this.pagamentos = resultado,
      console.warn
    )
  }

  selecionarPagamento(pagamento: Pagamento) {
    this.pagamentoSelecionado = pagamento.id
    this.pedido.pagamento = pagamento
  }

  emPromocao(pedidoItem: PedidoItem) {
    return pedidoItem.precoUnitario < pedidoItem.item.valor
  }

  adicionar(item: ItemVenda) {
    let { itens } = this.pedido
    const index = itens.findIndex(pedido => pedido.item.id == item.id)
    let pedidoItem: PedidoItem

    if(index >= 0) {
      itens[index].quantidade++
      pedidoItem = itens[index]
    } else {
      pedidoItem = this.criarNovoPedidoItem(item)
      this.pedido.itens = [...this.pedido.itens, pedidoItem]
    }
    
    this.calcularTotalItem(pedidoItem)
    this.itemSugerido = null
  }

  remover(item: ItemVenda) {
    this.pedido.itens = this.pedido.itens.filter(pedidoItem => pedidoItem.item.id != item.id)
    this.calcularTotal()
  }

  atualizarQuantidade(pedidoItem: PedidoItem) {
    if(pedidoItem.item.tipo == TipoItem.PRODUTO) {
      this.validarEstoque(pedidoItem)
    } else {
      this.calcularTotalItem(pedidoItem)
    }
  }

  private criarNovoPedidoItem(item: ItemVenda) {
    let pedidoItem: PedidoItem = {
      id: 0,
      item,
      quantidade: 1,
      precoUnitario: item.valor,
      precoTotal: item.valor,
      patazBonusTotal: 0
    }

    if(item.tipo == TipoItem.SERVICO) {
      let servico = <Servico>item
      pedidoItem.patazBonusTotal = item.patazBonus
      pedidoItem.servico = servico
      this.servicoService.obterPromocao(servico).subscribe(resultado => {
        pedidoItem = this.aplicarPromocao(servico, pedidoItem, resultado)
      })
    } else {
      let produto = <Produto>item
      pedidoItem.produto = produto
      this.produtoService.obterEstoque(produto).subscribe(resultado => produto.estoque = resultado)
      this.produtoService.obterPromocao(produto).subscribe(resultado => {
        pedidoItem = this.aplicarPromocao(produto, pedidoItem, resultado)
      }, console.warn)
    }

    return pedidoItem
  }

  private aplicarPromocao(item: ItemVenda, pedidoItem: PedidoItem, promocao?: Promocao) {
    if(promocao) {
      let valorComDesconto = (1 - (promocao.desconto/100)) * item.valor
      pedidoItem.precoUnitario = valorComDesconto
      pedidoItem.precoTotal = valorComDesconto
      this.calcularTotalItem(pedidoItem)
    }

    return pedidoItem
  }
  
  private validarEstoque(pedidoItem: PedidoItem) {
    let produto = <Produto>pedidoItem.item
    
    if(produto.estoque.saldo > 0) {
      if(pedidoItem.quantidade > produto.estoque.saldo) {
        this.mensagem.warning(`Estoque disponível para esse produto: ${produto.estoque.saldo}`)
        pedidoItem.quantidade = produto.estoque.saldo
      }
      this.calcularTotalItem(pedidoItem)

    } else {
      this.mensagem.warning(`Produto não está disponível no estoque`)
      this.remover(pedidoItem.item)
    }
  }

  private calcularTotalItem(pedidoItem: PedidoItem) {
    pedidoItem.precoTotal = pedidoItem.precoUnitario * pedidoItem.quantidade
    this.calcularTotal()
  }

  private calcularTotal() {
    this.pedido.total = this.pedido.itens.reduce((total, item) => total += item.precoTotal, 0)
  }

  finalizar() {
    if(this.isValido()) {
      this.pedidoService.salvar(this.pedido).subscribe(
        resultado => {
          console.log(resultado)
          this.mensagem.success(`Pedido no. ${resultado.id} efetuado com sucesso!`)
          this.router.navigate(['/pedido', resultado.id])
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
