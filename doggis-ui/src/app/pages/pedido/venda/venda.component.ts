import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente, ItemVenda, Pagamento, TipoItem, Pedido, PedidoItem, Produto, Servico } from 'src/app/models';
import { PedidoService, ClienteService, ProdutoService } from 'src/app/providers';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {

  public pedido: Pedido = new Pedido()
  public clientes: Cliente[]
  public itensPedido: ItemVenda[]
  public itensVenda: ItemVenda[]
  public pagamentos: Pagamento[]
  public pagamentoSelecionado: number

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private mensagem: ToastrService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.listarPagamentos()
  }

  get p() {
    return this.pedido
  }

  buscarClientes(event) {
    const termo = event.query
    this.clienteService.buscar(termo).subscribe(
      resultado => this.clientes = resultado,
      console.warn
    )
  }

  buscarItensVenda(event) {
    const termo = event.query
    this.pedidoService.buscar(termo).subscribe(
      resultado => this.itensVenda = resultado,
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

  adicionar(item: ItemVenda) {
    let { itens } = this.pedido
    const index = itens.findIndex(pedido => pedido.item.id == item.id)

    if(index >= 0) {
      itens[index].quantidade++

    } else {
      let pedidoItem: PedidoItem = {
        id: 0,
        item,
        quantidade: 1,
        precoUnitario: item.valor,
        precoTotal: item.valor,
        patazBonusTotal: 0
      }

      if(item.tipo == TipoItem.SERVICO) {
        pedidoItem.patazBonusTotal = item.patazBonus
        pedidoItem.servico = <Servico>item
      } else {
        pedidoItem.produto = <Produto>item
      }
  
      this.pedido.itens = [pedidoItem, ...itens]
    }

    this.calcularTotal()
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
  
  private validarEstoque(pedidoItem: PedidoItem) {
    let produto = <Produto>pedidoItem.item
    this.produtoService.obterEstoque(produto).subscribe(
      resultado => {
        produto.estoque = resultado
        if(produto.estoque.quantidade > 0) {
          if(pedidoItem.quantidade > produto.estoque.quantidade) {
            this.mensagem.warning(`Estoque disponível para esse item: ${produto.estoque.quantidade}`)
            pedidoItem.quantidade = produto.estoque.quantidade
          }
          this.calcularTotalItem(pedidoItem)

        } else {
          this.mensagem.warning(`Produto não está disponível no estoque`)
          this.remover(pedidoItem.item)
        }
      },
      console.warn
    )
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
