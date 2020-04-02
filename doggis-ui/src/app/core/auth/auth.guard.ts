import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/providers/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private service: AuthService,
        private router: Router,
        private mensagem: ToastrService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        if (!this.service.isLogado()) {
            this.router.navigate([''])
            return false;
        }

        this.service.obterUsuario().subscribe(
            usuario => {
                if(usuario && !this.service.temPermissao(state.url.substr(1))) {
                    const rota = this.service.obterRotaPadrao()

                    if(rota) {
                        this.router.navigate([rota])
                    } else {
                        this.mensagem.warning('Você não tem permissão para acessar essa página')
                    }
                }
            }
        )

        return true;
    }
}