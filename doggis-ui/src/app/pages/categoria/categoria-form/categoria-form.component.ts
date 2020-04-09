import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { CategoriaService } from 'src/app/providers';
import { Categoria } from 'src/app/models';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent implements OnInit {
  @Input('exibir') exibir: Subject<Categoria>
  @Output() onSalvar = new EventEmitter<Categoria>()
  @ViewChild('categoriaModal') 
  private modalTemplate: TemplateRef<any>
  private modal: any

  public categoriaForm: FormGroup
  public categoria: Categoria

  constructor(
    private formBuilder: FormBuilder,
    private service: CategoriaService,
    private mensagem: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.gerarForm()
    this.exibir.subscribe(categoria => this.abrir(categoria))
  }

  get f() {
    return this.categoriaForm.controls
  }

  abrir(categoria: Categoria) {
    this.categoriaForm.reset()
    if(categoria) {
      this.categoria = categoria
      this.categoriaForm.setValue(categoria)
    }

    this.modal = this.modalService.open(this.modalTemplate, { windowClass: 'modal-mini', size: 'lg', centered: true })
  }

  private gerarForm() {
    this.categoriaForm = this.formBuilder.group({
      id: [],
      descricao: ['', Validators.required],
      dataInclusao: []
    })
  }

  salvar() {
    if(this.categoriaForm.valid) {
      this.categoria = this.categoriaForm.value
      
      if(this.categoria.id) {
        this.editar()
      } else {
        this.criar()
      }
    }
  }

  private criar() {
    this.service.salvar(this.categoria).subscribe(
      resultado => {
        this.mensagem.success(`Categoria ${resultado.descricao} salva com sucesso!`)
        this.onSalvar.emit(resultado)
      },
      error => {
        console.warn(error)
        this.mensagem.error('Ocorreu um erro ao tentar salvar essa categoria')
      },
      () => this.modal.close()
    )
  }

  private editar() {
    this.service.editar(this.categoria.id, this.categoria).subscribe(
      resultado => {
        this.mensagem.success(`Categoria ${resultado.descricao} alterada com sucesso!`)
        this.onSalvar.emit(resultado)
      },
      error => {
        console.warn(error)
        this.mensagem.error('Ocorreu um erro ao tentar editar essa categoria')
      },
      () => this.modal.close()
    )
  }
}
