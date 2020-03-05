import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EstoqueService, ProdutoService } from 'src/app/providers';
import { Estoque, Produto } from 'src/app/models';

@Component({
  selector: 'app-estoque-form',
  templateUrl: './estoque-form.component.html',
  styleUrls: ['./estoque-form.component.scss']
})
export class EstoqueFormComponent implements OnInit {

  @Input('estoque') 
  estoque$: Subject<Estoque>

  @Output() 
  onSalvar = new EventEmitter<Estoque>()

  @Output() 
  onSelecionar = new EventEmitter<Estoque>()

  public estoqueForm: FormGroup
  public produtos: Produto[] =[]
  private estoque: Estoque

  constructor(
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private estoqueService: EstoqueService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.gerarForm()
    this.estoque$.subscribe(estoque => this.abrir(estoque))
  }

  get f() {
    return this.estoqueForm.controls
  }

  abrir(estoque: Estoque) {
    if(estoque) {
      this.estoque = estoque
      this.estoqueForm.setValue(estoque)
    }
  }

  buscar(termo: string) {
    this.produtoService.buscar(termo).subscribe(
      resultado => this.produtos = resultado,
      console.warn
    )
  }

  selecionar() {
    const { produto } = this.f
    this.onSelecionar.next(produto.value)
  }

  salvar() {
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
        this.onSalvar.emit()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse estoque')
      }
    )
  }

  private editar() {
    this.estoqueService.salvar(this.estoque).subscribe(
      () => {
        this.mensagem.success(`Estoque do produto ${this.estoque.produto.descricao} salvo com sucesso!`)
        this.onSalvar.emit()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse estoque')
      }
    )
  }

  private gerarForm() {
    this.estoqueForm = this.formBuilder.group({
      id: [],
      usuario: [],
      saldo: [],
      dataInclusao: [],
      produto: [null, Validators.required],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      tipo: [null, Validators.required]
    })
  }
}
