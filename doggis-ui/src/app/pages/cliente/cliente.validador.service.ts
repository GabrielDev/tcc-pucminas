import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';
import { ClienteService } from 'src/app/providers';

@Injectable()
export class ClienteValidadorService {

    constructor(private service: ClienteService) {}

    verificarCpf() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(600))
                .pipe(switchMap(cpf => this.service.buscar(cpf)))
                .pipe(map(isCadastrado => isCadastrado ? { cpfCadastrado: true } : null))
                .pipe(first());
        }
    }
}