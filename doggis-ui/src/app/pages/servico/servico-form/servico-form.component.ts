import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ServicoService, ProdutoService, PerfilService } from 'src/app/providers';
import { Produto, HistoricoPreco, Servico, TipoItem, Perfil, PerfilPadrao } from 'src/app/models';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.scss']
})
export class ServicoFormComponent implements OnInit {

  public servicoForm: FormGroup
  public produto: Produto
  public produtos: Produto[] = []
  public historicos: HistoricoPreco[] = []
  public perfis: {id: number, descricao: string}[] = []

  private servico: Servico
  private buscaProduto$ = new Subject<string>()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private servicoService: ServicoService,
    private produtoService: ProdutoService,
  ) { }

  ngOnInit(): void {
    let { id } = this.route.snapshot.params

    this.gerarForm()
    this.definirBusca()
    this.listarPerfisPadrao()

    if(id) {
      this.obterServico(id)
    }
  }

  get f() {
    return this.servicoForm.controls
  }

  obterServico(id: number) {
    this.servicoService.obterPorId(id).subscribe(
      resultado => {
        this.servico = resultado
        this.servico.duracao = resultado.duracao[1]
        this.servicoForm.setValue(this.servico)
        this.listarHistorico()
      }
    )
  }

  listarHistorico() {
    this.servicoService.listarHistorico(this.servico).subscribe(
      resultado => this.historicos = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter o histórico de preço desse produto')
      }
    )
  }

  private listarPerfisPadrao() {
    this.perfis = [{
        id: PerfilPadrao.ATENDENTE,
        descricao: 'Atendente'
      },
      {
        id: PerfilPadrao.VETERINARIO,
        descricao: 'Veterinário'
      }]
  }

  private definirBusca() {
    this.buscaProduto$
            .pipe(debounceTime(400))
            .pipe(switchMap(termo =>  this.produtoService.buscar(termo)))
            .subscribe(
              resultado => this.produtos = resultado,
              console.warn
            )
  }

  buscarProdutos(event) {
    const termo = event.query
    this.buscaProduto$.next(termo)
  }

  adicionarProduto(produto: Produto) {
    let { produtos } = this.f
    let existente = produtos.value.some(item => item.id == produto.id)

    if(existente) {
      this.produto = null
      this.mensagem.success(`O produto ${produto.descricao} já foi associado a esse serviço`)
      return
    }

    if(this.servico?.id) {
      this.servicoService.adicionarProduto(this.servico, produto).subscribe(
        () => produtos.setValue([produto, ...produtos.value]),
        error => {
          console.warn(error);
          this.mensagem.warning('Ocorreu um erro ao tentar adicionar esse produto')
        }
      )
    } else {
      produtos.setValue([produto, ...produtos.value])
    }

    this.produto = null
  }

  excluirProduto(produto: Produto) {
    let { produtos } = this.f
    
    if(this.servico?.id) {
      this.servicoService.removerProduto(this.servico, produto).subscribe(
        () => produtos.setValue(produtos.value.filter(item => item.id != produto.id)),
        error => {
          console.warn(error);
          this.mensagem.warning('Ocorreu um erro ao tentar remover esse produto')
        }
      )
    } else {
      produtos.setValue(produtos.value.filter(item => item.id != produto.id))
    }
  }

  aplicarFoto(foto: string) {
    this.f.foto.setValue(foto)
  }

  salvar() {
    this.servicoForm.markAllAsTouched()
    if(this.servicoForm.valid) {
      this.servico = this.servicoForm.value

      if(this.servico.id) {
        this.editar()
      } else {
        this.criar()
      }
    }
  }

  private criar() {
    this.servicoService.salvar(this.servico).subscribe(
      () => {
        this.mensagem.success(`Serviço ${this.servico.descricao} salvo com sucesso!`)
        this.router.navigate(['/servico'])
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse serviço')
      }
    )
  }

  private editar() {
    this.servicoService.editar(this.servico.id, this.servico).subscribe(
      () => {
        this.mensagem.success(`Serviço ${this.servico.descricao} salvo com sucesso!`)
        this.router.navigate(['/servico'])
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse serviço')
      }
    )
  }

  private gerarForm() {
    this.servicoForm = this.formBuilder.group({
      id: [],
      descricao: [null, [Validators.required, Validators.minLength(3)]],
      foto: [''],
      valor: [null, [Validators.required, Validators.min(1)]],
      duracao: [null, [Validators.required, Validators.min(1), Validators.max(60)]],
      patazBonus: [0],
      patazDesconto: [0],
      produtos: [[]],
      dataInclusao: [],
      responsavel: [null, Validators.required],
    })
  }

  comparador(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
