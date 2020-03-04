import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService, FabricanteService, CategoriaService } from 'src/app/providers';
import { Fabricante, Categoria, Produto, HistoricoPreco } from 'src/app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

  @Input('exibir') 
  exibir: Subject<Produto>

  @Output() 
  onSalvar = new EventEmitter<Produto>()

  @ViewChild('produtoModal') 
  private modalTemplate: TemplateRef<any>
  private modal: any

  public produtoForm: FormGroup
  public categorias: Categoria[] = []
  public fabricantes: Fabricante[] = []
  public historico: HistoricoPreco[] = []
  private produto: Produto

  constructor(
    private modalService: NgbModal,
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private fabricanteService: FabricanteService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.gerarForm()
    this.exibir.subscribe(produto => this.abrir(produto))
  }

  get f() {
    return this.produtoForm.controls
  }

  abrir(produto: Produto) {
    if(produto) {
      this.produto = produto
      this.produtoForm.setValue(produto)
    }

    this.listarCategorias()
    this.listarFabricantes()

    this.modal = this.modalService.open(this.modalTemplate, { windowClass: 'modal-mini', size: 'lg', centered: true })
  }

  listarFabricantes() {
    this.fabricanteService.listar().subscribe(
      resultado => this.fabricantes = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter os fabricantes')
      }
    )
  }

  listarCategorias() {
    this.categoriaService.listar().subscribe(
      resultado => this.categorias = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter os categorias')
      }
    )
  }

  listarHistorico() {
    this.produtoService.listarHistorico(this.produto).subscribe(
      resultado => this.historico = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter o histórico de preço desse produto')
      }
    )
  }

  salvar() {
    if(this.produtoForm.valid) {
      this.produto = this.produtoForm.value

      if(this.produto.id) {
        this.editar()
      } else {
        this.criar()
      }
    }
  }

  private criar() {
    this.produtoService.salvar(this.produto).subscribe(
      () => {
        this.mensagem.success(`Produto ${this.produto.descricao} salvo com sucesso!`)
        this.produtoForm.reset()
        this.onSalvar.emit()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse produto')
      },
      () => this.modal.close()
    )
  }

  private editar() {
    this.produtoService.salvar(this.produto).subscribe(
      () => {
        this.mensagem.success(`Produto ${this.produto.descricao} salvo com sucesso!`)
        this.produtoForm.reset()
        this.onSalvar.emit()
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse produto')
      },
      () => this.modal.close()
    )
  }

  private gerarForm() {
    this.produtoForm = this.formBuilder.group({
      id: [],
      descricao: [null, Validators.required],
      foto: [''],
      valor: [null, [Validators.required, Validators.min(1)]],
      categoria: [null, Validators.required],
      fabricante: [null, Validators.required],
      promocao: [],
      dataInclusao: [],
      tipo: [],
    })
  }

  comparador(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
