import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';
import { UsuarioService } from 'src/app/providers';

@Injectable()
export class UsuarioValidadorService {

    constructor(private service: UsuarioService) {}

    verificarCpf() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(cpf => this.service.buscar(cpf)))
                .pipe(map(isCadastrado => isCadastrado ? { cpfCadastrado: true } : null))
                .pipe(first());
        }
    }
}