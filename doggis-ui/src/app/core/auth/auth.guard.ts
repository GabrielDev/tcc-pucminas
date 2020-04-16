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
                const destino = state.url.substr(1)
                if(usuario && !this.service.temPermissao(destino)) {
                    if(destino == 'dashboard') {
                        const rota = this.service.obterRotaPadrao()
                        this.router.navigate([rota])
                    } else {
                        this.router.navigate(['nao-autorizado'])
                    }
                }
            }
        )

        return true;
    }
}