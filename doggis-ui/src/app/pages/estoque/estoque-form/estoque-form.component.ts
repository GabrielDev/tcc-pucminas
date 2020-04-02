import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { EstoqueService, ProdutoService } from 'src/app/providers';
import { Estoque, Produto, TipoEstoque } from 'src/app/models';

@Component({
  selector: 'app-estoque-form',
  templateUrl: './estoque-form.component.html',
  styleUrls: ['./estoque-form.component.scss']
})
export class EstoqueFormComponent implements OnInit {

  @Input('estoque') 
  estoque: Estoque

  @Output() 
  onSalvar = new EventEmitter<Produto>()

  @Output() 
  onSelecionar = new EventEmitter<Produto>()

  public estoqueForm: FormGroup
  public produtos: Produto[] =[]
  public tipos = [{titulo: 'Entrada', tipo: TipoEstoque.ENTRADA }, {titulo: 'Saída', tipo: TipoEstoque.SAIDA }]

  private buscaProduto$ = new Subject<string>()

  constructor(
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private estoqueService: EstoqueService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.gerarForm()
    this.definirBuscas()
  }

  get f() {
    return this.estoqueForm.controls
  }

  buscar(event: any) {
    const termo = event.query
    this.buscaProduto$.next(termo)
  }

  private definirBuscas() {
    this.buscaProduto$
        .pipe(debounceTime(400))
        .pipe(switchMap(termo => this.produtoService.buscar(termo)))
        .subscribe(
          resultado => this.produtos = resultado,
          console.warn
        )
  }

  selecionar() {
    const { produto } = this.f
    this.onSelecionar.next(produto.value)
  }

  selecionarTipo(tipo: TipoEstoque) {
    this.f.tipo.setValue(tipo)
  }

  salvar() {
    this.estoqueForm.markAllAsTouched()
    if(this.estoqueForm.valid) {
      this.estoque = this.estoqueForm.value

      if(this.estoque.id) {
        this.editar()
      } else {
        this.criar()
      }
    }
  }

  private criar() {
    this.estoqueService.salvar(this.estoque).subscribe(
      () => {
        this.mensagem.success(`Estoque do produto ${this.estoque.produto.descricao} salvo com sucesso!`)
        this.onSalvar.emit(this.estoque.produto)
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse estoque')
      },
      () => this.estoqueForm.reset()
    )
  }

  private editar() {
    this.estoqueService.salvar(this.estoque).subscribe(
      () => {
        this.mensagem.success(`Estoque do produto ${this.estoque.produto.descricao} salvo com sucesso!`)
        this.onSalvar.emit(this.estoque.produto)
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse estoque')
      },
      () => this.estoqueForm.reset()
    )
  }

  private gerarForm() {
    this.estoqueForm = this.formBuilder.group({
      id: [],
      usuario: [],
      saldo: [],
      dataInclusao: [],
      produto: [null, Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      tipo: [TipoEstoque.ENTRADA, Validators.required]
    })
  }

  comparador(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
