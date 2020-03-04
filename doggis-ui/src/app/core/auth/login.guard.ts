import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/providers/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

    constructor(
        private service: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        if (this.service.isLogado()) {
            this.router.navigate(['dashboard', this.service.obterNomeUsuario()])
            return false;
        }
        return true;
    }
}