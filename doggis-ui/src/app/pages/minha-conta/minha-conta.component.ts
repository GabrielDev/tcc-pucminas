import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/providers';
import { AuthService } from 'src/app/providers/auth.service';
import { Usuario } from 'src/app/models';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {

  public usuarioForm: FormGroup
  public usuario: Usuario

  constructor(
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) {
    this.gerarForm()
  }

  ngOnInit(): void {
    this.authService.obterUsuario().subscribe(resultado => {
      console.log(resultado)
      this.usuario = resultado
      this.usuario.senha = ''
      this.usuarioForm.setValue(resultado)
      this.f.nome.setValue(this.usuario.nome)
    })
  }

  get f() {
    return this.usuarioForm.controls
  }

  validarSenha() {
    let { senha, confirmar } = this.f

    if(senha.value) {
      senha.setValidators([Validators.required, Validators.minLength(3)])
      confirmar.setValidators([Validators.required, Validators.minLength(3)])
    }
  }

  salvar() {
    if(this.usuarioForm.valid) {
      this.usuario = this.usuarioForm.value

      this.usuarioService.salvarMinhaConta(this.usuario).subscribe(
        resultado => {
          this.usuario = resultado
          this.authService.notificar(this.usuario)
          this.mensagem.success(`Salvo com sucesso!`)
        },
        error => {
          console.warn(error)
          this.mensagem.warning('Ocorreu um erro ao tentar salvar sua conta')
        }
      )
    }
  }
  
  aplicarFoto(foto: string) {
    this.f.foto.setValue(foto)
  }

  private gerarForm() {
    this.usuarioForm = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.min(3)]],
      email: [null, [Validators.required, Validators.email]],
      foto: [],
      cpf: [],
      rg: [],
      perfil: [null, Validators.required],
      senha: [null],
      confirmar: [null],
      registro: [],
      especialidades: [],
      avaliacoes: [],
      dataInclusao: [],
    })
  }

}
