import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PainelComponent } from './painel/painel.component';
import { ProgressSpinnerModule } from 'primeng';

@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule,
  ],
  declarations: [DashboardComponent, PainelComponent],
  exports: [DashboardComponent, PainelComponent]
})
export class DashboardModule { }
