import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService, FabricanteService, CategoriaService } from 'src/app/providers';
import { Fabricante, Categoria, Produto, HistoricoPreco } from 'src/app/models';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  public produtoForm: FormGroup
  public categorias: Categoria[] = []
  public fabricantes: Fabricante[] = []
  public historico: HistoricoPreco[] = []
  private produto: Produto

  constructor(
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private fabricanteService: FabricanteService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.produto.id = this.route.snapshot.params.id
    this.gerarForm()
    this.listarCategorias()
    this.listarFabricantes()
    this.obterProduto()
  }

  get f() {
    return this.produtoForm.controls
  }

  obterProduto() {
    this.produtoService.obterPorId(this.produto.id).subscribe(
      resultado => {
        this.produto = resultado
        this.produtoForm.setValue(this.produto)
      },
      error => {
        this.router.navigate(['/produto'])
        this.mensagem.warning('Produto não encontrado')
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
      resultado => this.mensagem.success(`Produto ${this.produto.descricao} salvo com sucesso!`),
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse produto')
      }
    )
  }

  private editar() {
    this.produtoService.salvar(this.produto).subscribe(
      resultado => this.mensagem.success(`Produto ${this.produto.descricao} salvo com sucesso!`),
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse produto')
      }
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
    })
  }

}
