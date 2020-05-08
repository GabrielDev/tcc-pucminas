import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Cliente, ItemVenda, Pagamento, TipoItem, Pedido, PedidoItem, Produto, Servico, Promocao } from 'src/app/models';
import { PedidoService, ClienteService, ProdutoService, ServicoService } from 'src/app/providers';

@Component({
  selector: 'app-venda',
  templateUrl: './pedido-venda.component.html',
  styleUrls: ['./pedido-venda.component.scss']
})
export class PedidoVendaComponent implements OnInit, OnDestroy {

  public salvando: boolean
  public pedido: Pedido = new Pedido()
  public clientes: Cliente[]
  public itensPedido: ItemVenda[]
  public itensVenda: ItemVenda[]
  public pagamentos: Pagamento[]
  public pagamentoSelecionado: number
  public itemSugerido: ItemVenda
  public abrirModalCliente: Subject<Cliente> = new Subject()
  public abrirModalDesconto: Subject<Pedido> = new Subject()
  public abrirModalAgenda: Subject<Servico> = new Subject()

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
    this.abrirModalCliente.next()
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

  incluir(item: ItemVenda) {
    let isServico = item.tipo == TipoItem.SERVICO

    if(isServico) {
      let servico = item as Servico
      this.abrirModalAgenda.next(servico)
    } else {
      this.adicionar(item)
    }
  }

  adicionar(item: ItemVenda) {
    let { itens } = this.pedido
    const index = itens.findIndex(pedido => pedido.item.id == item.id && pedido.item.tipo == item.tipo)

    if(index >= 0) {
      itens[index].quantidade++
      this.atualizarQuantidade(itens[index])
    } else {
      let pedidoItem = this.criarNovoPedidoItem(item)
      this.pedido.itens = [...this.pedido.itens, pedidoItem]
      this.calcularTotalItem(pedidoItem)
    }
    
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
      pedidoItem.patazBonusTotal = pedidoItem.servico.patazBonus * pedidoItem.quantidade
      this.calcularTotalItem(pedidoItem)
    }
  }

  aplicarDesconto(pedido: Pedido) {
    this.pedido = pedido
    this.calcularTotal()
  }

  usarPataz() {
    if(this.permiteDesconto()) {
      this.abrirModalDesconto.next(this.pedido)
    }
  }

  private permiteDesconto(): boolean {
    let { totalPataz } = this.pedido.cliente
    let servicos = this.pedido.itens.filter(pedidoItem => pedidoItem.item.tipo == TipoItem.SERVICO)
    let isValido = servicos.some(pedidoItem => (pedidoItem.item as Servico).patazDesconto <= totalPataz)

    if(!servicos.length) {
      this.mensagem.info(`O pedido ainda não possui serviços para utilizar Pataz`)
    } else if(!isValido) {
      this.mensagem.info(`${this.pedido.cliente.nome} ainda não possui Pataz suficiente para aplicar nesse pedido`)
    }
    
    return isValido
  }

  private criarNovoPedidoItem(item: ItemVenda) {
    let pedidoItem: PedidoItem = {
      id: 0,
      item,
      quantidade: 1,
      precoUnitario: item.valor,
      precoDesconto: 0,
      precoSubtotal: item.valor,
      precoTotal: item.valor,
      patazBonusTotal: 0
    }

    if(item.tipo == TipoItem.SERVICO) {
      let servico = <Servico>item
      pedidoItem.patazBonusTotal = item.patazBonus
      pedidoItem.servico = servico

      this.servicoService.obterPromocao(servico).subscribe(resultado => {
        pedidoItem = this.aplicarPromocao(servico, pedidoItem, resultado)
      }, console.warn)
    } else {
      let produto = <Produto>item
      pedidoItem.produto = produto
      this.produtoService.obterPromocao(produto).subscribe(resultado => pedidoItem = this.aplicarPromocao(produto, pedidoItem, resultado))
      this.produtoService.obterEstoque(produto).subscribe(resultado => {
        produto.estoque = resultado
        this.validarEstoque(pedidoItem)
      })
    }

    return pedidoItem
  }

  private aplicarPromocao(item: ItemVenda, pedidoItem: PedidoItem, promocao?: Promocao) {
    if(promocao) {
      let valorComDesconto = (1 - (promocao.desconto/100)) * item.valor
      pedidoItem.precoUnitario = valorComDesconto
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
      Swal.fire({
        icon: 'error',
        title: 'Que pena!',
        text: `Produto não está disponível no estoque`,
      })
      this.remover(pedidoItem.item)
    }
  }

  private calcularTotalItem(pedidoItem: PedidoItem) {
    pedidoItem.precoSubtotal = pedidoItem.precoUnitario * pedidoItem.quantidade
    pedidoItem.precoTotal = pedidoItem.precoSubtotal - pedidoItem.precoDesconto
    this.calcularTotal()
  }

  private calcularTotal() {
    this.pedido.subtotal = this.pedido.desconto = this.pedido.total = this.pedido.patazBonusTotal = 0
    this.pedido.itens.forEach((item) => {
      this.pedido.subtotal += item.precoSubtotal
      this.pedido.desconto += item.precoDesconto
      this.pedido.total += item.precoTotal
    })

    this.pedido.patazBonusTotal = this.pedido.itens.reduce((total, item) => (!item.precoDesconto)? total += item.patazBonusTotal: total, 0)
  }

  finalizar() {
    if(this.isValido()) {
      this.salvando = true
      const novoPedido = this.comprimir()
      this.pedidoService.salvar(novoPedido).subscribe(
        resultado => {
          Swal.fire({
            icon: 'success',
            title: 'Pedido concluído!',
            text: `Pedido no. ${resultado.id} efetuado com sucesso!`,
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success border-0',
            }
          })
          this.router.navigate(['/pedido', resultado.id])
        },
        error => {
          console.warn(error)
          this.mensagem.error('Ocorreu um erro ao tentar efetuar o pedido')
        },
        () => this.salvando = false
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

  private comprimir() {
    let novoPedido = { ...this.pedido }
    novoPedido.cliente = { ...this.pedido.cliente }
    novoPedido.itens = [ ...this.pedido.itens ]
    novoPedido.itens = novoPedido.itens.map(item => ({ ...item }))

    novoPedido.cliente.pets = []
    novoPedido.cliente.foto = null
    novoPedido.itens = novoPedido.itens.map(item => {
      let { produto, servico } = item
      let novoItem = { ...item }

      if(novoItem['foto']) {
        novoItem['foto'] = null
      }

      if(produto) {
        novoItem.produto = { ...produto } as Produto
        novoItem.produto.foto = null
        novoItem.produto.estoque = null
      } else {
        novoItem.servico = { ...servico } as Servico
        novoItem.servico.foto = null
      }
      return novoItem
    })

    return novoPedido
  }
}
