import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Login, AuthResponse } from 'src/app/models';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mensagem: ToastrService,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.gerarForm()
  }

  logar() {
    if(this.loginForm.valid) {
      let login: Login = this.loginForm.value
      this.service.login(login).subscribe(
        resposta => {
          this.service.setToken(resposta.token)
          this.router.navigate(['dashboard'])
        },
        error => {
          console.warn(error)
          this.mensagem.error(`Ocorreu um erro ao tentar efetuar o login\n Verifique seu e-mail e senha e tente novamente`)
        }
      )
    }
  }

  recuperarSenha() {
    this.mensagem.info("Solicite a alteração da senha ao Administrador")
  }

  cadastrar() {
    this.mensagem.info("Solicite a inclusão do seu cadastro ao Administrador")
  }

  get f() {
    return this.loginForm.controls
  }

  private gerarForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required]
    })
  }

}
