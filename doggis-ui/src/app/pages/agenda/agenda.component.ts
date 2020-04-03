import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  public events: any[]
  public options: any

  constructor() { }

  ngOnInit() {
    this.options = {
      locale: 'pt-br',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      }
    }

    this.listar()
  }

  private adicionarDia(dias: number = 0, data: Date = new Date()) {
    data.setDate(data.getDate() + dias)
    return data
  }

  listar() {
    this.events = [
      {
        "id": 1,
        "title": "Banho e tosa - Dudu",
        "start": this.adicionarDia()
      },
      {
        "id": 2,
        "title": "Tosa - Cherie",
        "start": this.adicionarDia(2),
      },
      {
        "id": 3,
        "title": "Vacinação - Bebel",
        "start": this.adicionarDia(7)
      },
      {
        "id": 4,
        "title": "Banho - Tobias",
        "start": this.adicionarDia(9)
      },
      {
        "id": 5,
        "title": "Tosa - Lili",
        "start": this.adicionarDia(10),
        "end": this.adicionarDia(11)
      },
      {
        "id": 6,
        "title": "Vacinação - Matilde",
        "start": this.adicionarDia(12),
      },
      {
        "id": 7,
        "title": "Banho e tosa - Clotilde",
        "start": this.adicionarDia(14)
      },
      {
        "id": 8,
        "title": "Banho - Estrela",
        "start": this.adicionarDia(15)
      },
      {
        "id": 9,
        "title": "Vacinação - Rex",
        "start": this.adicionarDia(16)
      },
      {
        "id": 10,
        "title": "Vacinação - Faisca",
        "start": this.adicionarDia(18)
      },
      {
        "id": 11,
        "title": "Banho e Tosa - Nikita",
        "start": this.adicionarDia(19)
      },
      {
        "id": 12,
        "title": "Tosa - bisteca",
        "start": this.adicionarDia(20)
      }
    ]
  }

}
