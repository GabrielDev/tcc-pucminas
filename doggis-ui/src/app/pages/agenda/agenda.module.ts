import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import { FullCalendarModule } from 'primeng';

@NgModule({
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  declarations: [AgendaComponent],
  exports: [AgendaComponent],
})
export class AgendaModule { }
