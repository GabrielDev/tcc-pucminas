import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteValidadorService } from '../cliente.validador.service';
import { ClienteService, EstadoService, PetService } from 'src/app/providers';
import { Cliente, Estado, Pet } from 'src/app/models';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  providers: [ClienteValidadorService],
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
    private validadorService: ClienteValidadorService,
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
        this.deveValidarCpf()
      },
      () => {
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

  deveValidarCpf() {
    let { cpf } = this.f
    if(this.cliente?.id) {
      if(cpf.value == this.cliente.cpf) {
        cpf.clearAsyncValidators()
      } else {
        cpf.setAsyncValidators(this.validadorService.verificarCpf())
      }
      cpf.updateValueAndValidity()
    }
  }

  aplicarFoto(foto: string) {
    this.f.foto.setValue(foto)
  }

  novoPet() {
    this.abrirModal.next()
  }

  editarPet(pet: Pet) {
    this.abrirModal.next(pet)
  }

  salvarPet(pet: Pet) {
    let pets = this.f.pets.value || []
    let index = pets.findIndex(item => pet.id && (item.id == pet.id) || item.nome == pet.nome)

    if (index >= 0) {
      pets[index] = pet
    } else {
      pets.push(pet)
    }

    this.f.pets.setValue(pets)
  }

  confirmarExcluir(pet: Pet) {
    if(pet.id) {
      Swal.fire({
        title: 'Atenção',
        text: `Todos os agendamentos do pet ${pet.nome} serão perdidos durante a exclusão, deseja continuar?`,
        icon: 'question',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-default',
          cancelButton: 'btn btn-outline-secondary'
        }
      }).then(({ value }) => {
        if(value) {
          this.excluirPet(pet)
        }
      })
    } else {
      this.excluirPet(pet)
    }
  }

  private excluirPet(pet: Pet) {
    if(pet.id) {
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
    } else {
      let pets = this.f.pets.value
      pets = pets.filter(item => item.nome != pet.nome)          
      this.cliente.pets = pets
      this.f.pets.setValue(pets)
      this.mensagem.success(`${pet.nome} excluído com sucesso`)
    }
  }

  salvar() {
    this.clienteForm.markAllAsTouched()
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
      nome: [null, [
        Validators.required, 
        Validators.minLength(3)
      ]],
      email: [null, [
        Validators.required, 
        Validators.email
      ]],
      foto: [],
      cpf: [null, 
        [
          Validators.required,
          Validators.minLength(14)
        ],
        this.validadorService.verificarCpf()
      ],
      rg: [null, [
        Validators.required, 
        Validators.maxLength(15)
      ]],
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
