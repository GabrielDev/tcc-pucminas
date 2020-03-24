import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioValidadorService } from '../usuario.validador.service';
import { UsuarioService, PerfilService, PetService } from 'src/app/providers';
import { Especie, Perfil, Usuario, PerfilPadrao } from 'src/app/models';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  providers: [UsuarioValidadorService]
})
export class UsuarioFormComponent implements OnInit {

  public especies: Especie[] = []
  public perfis: Perfil[] = []
  public usuarioForm: FormGroup
  public usuario: Usuario

  constructor(
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private validadorService: UsuarioValidadorService,
    private usuarioService: UsuarioService,
    private petService: PetService,
    private perfilService: PerfilService,
  ) { }

  ngOnInit(): void {
    let { id } = this.route.snapshot.params
    this.gerarForm()
    this.listarPerfis()
    this.listarEspecies()
    
    if(id) {
      this.obterUsuario(id)
    }
  }

  get f() {
    return this.usuarioForm.controls
  }

  obterUsuario(id: number) {
    this.usuarioService.obterPorId(id).subscribe(
      resultado => {
        this.usuario = resultado
        this.usuarioForm.setValue(this.usuario)
        this.deveValidarCpf()
      },
      error => {
        this.router.navigate(['/usuario'])
        this.mensagem.warning('Usuario não encontrado')
      }
    )
  }

  listarEspecies() {
    this.petService.listarEspecies().subscribe(
      resultado => {
         this.especies = resultado
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter as especies')
      }
    )
  }

  listarPerfis() {
    this.perfilService.listar().subscribe(
      resultado => this.perfis = resultado,
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar obter os perfis')
      }
    )
  }

  aplicarFoto(foto: string) {
    this.f.foto.setValue(foto)
  }

  deveValidarCpf() {
    let { cpf } = this.f
    if(this.usuario?.id) {
      if(cpf.value == this.usuario.cpf) {
        cpf.clearAsyncValidators()
      } else {
        cpf.setAsyncValidators(this.validadorService.verificarCpf())
      }
      cpf.updateValueAndValidity()
    }
  }

  possuiPerfilVeterinario() {
    let perfil = this.f.perfil.value
    let { registro, especialidades } = this.f
    const isVeterinario = (perfil && perfil.id == PerfilPadrao.VETERINARIO)

    if(isVeterinario) {
      especialidades.setValidators(Validators.required)
      registro.setValidators(Validators.required)
    } else {
      especialidades.clearValidators()
      registro.clearValidators()
    }

    return isVeterinario
  }

  salvar() {
    this.usuarioForm.markAllAsTouched()
    if(this.usuarioForm.valid) {
      this.usuario = this.usuarioForm.value

      if(this.usuario.id) {
        this.editar()
      } else {
        this.criar()
      }
    }
  }

  private criar() {
    this.usuarioService.salvar(this.usuario).subscribe(
      () => {
        this.mensagem.success(`${this.usuario.nome} salvo com sucesso!`)
        this.router.navigate(['/usuario'])
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse usuário')
      }
    )
  }

  private editar() {
    this.usuarioService.editar(this.usuario.id, this.usuario).subscribe(
      () => {
        this.mensagem.success(`${this.usuario.nome} salvo com sucesso!`)
        this.router.navigate(['/usuario'])
      },
      error => {
        console.warn(error)
        this.mensagem.warning('Ocorreu um erro ao tentar salvar esse usuário')
      }
    )
  }

  private gerarForm() {
    this.usuarioForm = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      foto: [],
      cpf: [null, 
        [
          Validators.required, 
          Validators.minLength(14)
        ],
        this.validadorService.verificarCpf()
      ],
      rg: [null, [Validators.required, Validators.maxLength(15)]],
      perfil: [null, Validators.required],
      registro: [],
      especialidades: [],
      avaliacoes: [],
      dataInclusao: [],
    })
  }

  comparador(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
