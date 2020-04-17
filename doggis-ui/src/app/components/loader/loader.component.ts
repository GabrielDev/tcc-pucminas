import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  public carregando: boolean
  private subscription: Subscription

  constructor(private service: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.service.isCarregando.subscribe(exibir => {
      this.carregando = exibir
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
