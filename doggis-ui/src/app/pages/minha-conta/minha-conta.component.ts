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
  public usuarioSenhaForm: FormGroup
  public usuario: Usuario

  constructor(
    private mensagem: ToastrService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.gerarForm()

    this.authService.obterUsuario().subscribe(resultado => {
      this.usuario = resultado
      this.usuarioForm.setValue(this.usuario)
      this.f.nome.setValue(this.usuario.nome)
    })
  }

  get f() {
    return this.usuarioForm.controls
  }

  get fs() {
    return this.usuarioSenhaForm.controls
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

  alterarSenha() {
    if(this.usuarioSenhaForm.valid) {
      this.usuario.senha = this.fs.senha.value

      this.usuarioService.alterarSenha(this.usuario).subscribe(
        () => this.mensagem.success(`Senha alterada com sucesso!`),
        error => {
          console.warn(error)
          this.mensagem.warning('Ocorreu um erro ao tentar alterar sua senha')
        }
      )
    }
  }
  
  aplicarFoto(foto: string) {
    this.f.foto.setValue(foto)
  }

  private gerarForm() {
    this.usuarioForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.min(3)]],
      email: [null, [Validators.required, Validators.email]],
      foto: [null],
      cpf: [null],
      rg: [null],
      perfil: [null, Validators.required],
      registro: [null],
      especialidades: [[]],
      avaliacoes: [[]],
      dataInclusao: [null],
    })

    this.usuarioSenhaForm = this.formBuilder.group({
      senha: [null, [Validators.required, Validators.min(3)]],
      confirmar: [null],
    })
  }

}
