import { Component } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public usuario$: Observable<Usuario>

  constructor(
    private service: AuthService,
  ) {
    this.usuario$ = this.service.obterUsuario()
  }

}
