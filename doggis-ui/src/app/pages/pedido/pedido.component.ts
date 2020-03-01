import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PedidoService, ClienteService, ProdutoService, ServicoService } from 'src/app/providers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, ItemVenda, Pagamento } from 'src/app/models';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  public pedidoForm: FormGroup
  public clientes: Cliente[]
  public itensPedido: ItemVenda[]
  public itensVenda: ItemVenda[]
  public pagamentos: Pagamento[]

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private servicoService: ServicoService,
    private formBuilder: FormBuilder,
    private mensagem: ToastrService
  ) { }

  ngOnInit() {
    this.gerarForm()
    //this.obterPagamentos()
  }

  teste() {
    this.mensagem.success('Teste')
  }

  private gerarForm() {
    this.pedidoForm = this.formBuilder.group({
      cliente: [null, Validators.required],
      itens: this.formBuilder.group({
       quantidade: [1, [Validators.required, Validators.min(1)]] 
      }),
      pagamento: [null, Validators.required]
    })
  }

  f() {
    return this.pedidoForm.controls
  }

  buscarClientes(termo: string) {
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

  obterPagamentos() {
    this.pedidoService.listarPagamentos().subscribe(
      resultado => this.pagamentos = resultado,
      console.warn
    )
  }

  finalizar() {

  }
}
