import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PetService } from 'src/app/providers';
import { Pet, Especie, Raca, Porte, TipoEspecie } from 'src/app/models';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  @Input('exibir')
  exibir: Subject<Pet>
  @Output()
  onSalvar = new EventEmitter<Pet>()

  @ViewChild('petModal')
  private modalTemplate: TemplateRef<any>
  private modal: any

  public especies: Especie[] = []
  public racas: Raca[] = []
  public portes: Porte[] = [Porte.PEQUENO, Porte.MEDIO, Porte.GRANDE]
  public petForm: FormGroup
  public pet: Pet

  constructor(
    private formBuilder: FormBuilder,
    private mensagem: ToastrService,
    private modalService: NgbModal,
    private service: PetService
  ) { }

  ngOnInit(): void {
    this.gerarForm()
    this.exibir.subscribe(pet => this.abrir(pet))
  }

  get f() {
    return this.petForm.controls
  }

  abrir(pet: Pet) {
    if (pet) {
      this.pet = pet
      this.petForm.setValue(pet)
      this.listarRacas()
    }

    this.listarEspecies()
    this.modal = this.modalService.open(this.modalTemplate, { windowClass: 'modal-mini', size: 'lg', centered: true })
  }

  listarEspecies() {
    this.service.listarEspecies().subscribe(
      resultado => this.especies = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter as especies')
      }
    )
  }

  listarRacas() {
    let especie = <Especie>this.f.especie.value

    this.service.listarRacas(especie).subscribe(
      resultado => this.racas = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter as racas')
      }
    )
  }

  selecionarEspecie(especie: Especie) {
    this.f.especie.setValue(especie)
    this.listarRacas()
  }

  exibirPortes() {
    let { porte, especie } = this.f
    let isExibir = especie.value && especie.value.id == TipoEspecie.CACHORRO

    if (isExibir) {
      porte.setValidators(Validators.required)
    } else {
      porte.clearValidators()
    }

    return isExibir
  }

  salvar() {
    if (this.petForm.valid) {
      this.pet = this.petForm.value
      this.onSalvar.emit(this.pet)
      this.petForm.reset()
      this.modal.close()
    }
  }

  private gerarForm() {
    this.petForm = this.formBuilder.group({
      id: [],
      nome: [null, Validators.required],
      especie: [null, Validators.required],
      raca: [null, Validators.required],
      porte: [],
      foto: [],
      alergia: [],
      descricao: [],
      dataInclusao: []
    })
  }

  comparador(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
