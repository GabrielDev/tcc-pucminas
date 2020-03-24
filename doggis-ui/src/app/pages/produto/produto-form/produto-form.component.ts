import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService, FabricanteService, CategoriaService } from 'src/app/providers';
import { Fabricante, Categoria, Produto, HistoricoPreco, TipoItem } from 'src/app/models';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

  public produtoForm: FormGroup
  public categorias: Categoria[] = []
  public fabricantes: Fabricante[] = []
  public historicos: HistoricoPreco[] = []
  private produto: Produto

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private fabricanteService: FabricanteService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    let { id } = this.route.snapshot.params

    this.gerarForm()
    this.listarCategorias()
    this.listarFabricantes()

    if(id) {
      this.obterProduto(id)
    }
  }

  get f() {
    return this.produtoForm.controls
  }

  obterProduto(id: number) {
    this.produtoService.obterPorId(id).subscribe(
      resultado => {
        this.produto = resultado,
        this.produtoForm.setValue(this.produto)
        this.listarHistorico()
      }
    )
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
      resultado => this.historicos = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter o histórico de preço desse produto')
      }
    )
  }

  aplicarFoto(foto: string) {
    this.f.foto.setValue(foto)
  }

  salvar() {
    this.produtoForm.markAllAsTouched()
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
        this.router.navigate(['/produto'])
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse produto')
      }
    )
  }

  private editar() {
    this.produtoService.salvar(this.produto).subscribe(
      () => {
        this.mensagem.success(`Produto ${this.produto.descricao} salvo com sucesso!`)
        this.router.navigate(['/produto'])
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse produto')
      }
    )
  }

  private gerarForm() {
    this.produtoForm = this.formBuilder.group({
      id: [],
      descricao: [null, [Validators.required, Validators.minLength(3)]],
      foto: [''],
      valor: [null, [Validators.required, Validators.min(1)]],
      categoria: [null, Validators.required],
      fabricante: [null, Validators.required],
      promocao: [],
      dataInclusao: [],
      tipo: [ TipoItem.PRODUTO ],
    })
  }

  comparador(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
