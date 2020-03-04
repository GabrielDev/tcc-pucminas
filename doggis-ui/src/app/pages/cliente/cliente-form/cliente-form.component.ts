import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, Estado, Pet } from 'src/app/models';
import { ClienteService, EstadoService, PetService } from 'src/app/providers';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  public estados: Estado[] = []
  public clienteForm: FormGroup
  public cliente: Cliente
  public abrirModal: Subject<Pet> = new Subject()

  constructor(
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private petService: PetService,
    private estadoService: EstadoService
  ) { }

  ngOnInit(): void {
    let { id } = this.route.snapshot.params
    this.gerarForm()
    this.listarEstado()
    
    if(id) {
      this.obterCliente(id)
    }
  }

  get f() {
    return this.clienteForm.controls
  }

  obterCliente(id: number) {
    this.clienteService.obterPorId(id).subscribe(
      resultado => {
        this.cliente = resultado
        this.clienteForm.setValue(this.cliente)
      },
      error => {
        this.router.navigate(['/cliente'])
        this.mensagem.warning('Cliente não encontrado')
      }
    )
  }

  listarEstado() {
    this.estadoService.listar().subscribe(
      resultado => this.estados = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter os estados')
      }
    )
  }

  novoPet() {
    this.abrirModal.next()
  }

  editarPet(pet: Pet) {
    this.abrirModal.next(pet)
  }

  salvarPet(pet: Pet) {
    let pets = this.f.pets.value

    if(!pets.length) {
      pets = [pet]
    } else {
      pets = pets.map(item => (item.id == pet.id || item.nome == pet.nome)? pet: item)
    }

    this.f.pets.setValue(pets)
  }

  excluirPet(pet: Pet) {
    this.petService.excluir(pet.id).subscribe(
      () => {
        let pets = this.cliente.pets.filter(p => p.id != pet.id)
        this.cliente.pets = pets
        this.f.pets.setValue(pets)
        this.mensagem.success(`${pet.nome} excluído com sucesso`)
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar excluir esse pet')
      }
    )
  }

  salvar() {
    if(this.clienteForm.valid) {
      this.cliente = this.clienteForm.value

      if(this.cliente.id) {
        this.editar()
      } else {
        this.criar()
      }
    }
  }

  private criar() {
    this.clienteService.salvar(this.cliente).subscribe(
      () => {
        this.mensagem.success(`Cliente ${this.cliente.nome} salvo com sucesso!`)
        this.router.navigate(['/cliente'])
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse cliente')
      }
    )
  }

  private editar() {
    this.clienteService.salvar(this.cliente).subscribe(
      () => {
        this.mensagem.success(`Cliente ${this.cliente.nome} salvo com sucesso!`)
        this.router.navigate(['/cliente'])
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse cliente')
      }
    )
  }

  private gerarForm() {
    this.clienteForm = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.min(3)]],
      email: [null, [Validators.required, Validators.min(3)]],
      foto: [],
      cpf: [null, [Validators.required]],
      rg: [null, Validators.required],
      endereco: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
      pets: [[]],
      totalPataz: [],
      dataInclusao: [],
      isAutorizaFoto: [false, Validators.required],
    })
  }

  comparador(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
