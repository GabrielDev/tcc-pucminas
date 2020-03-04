import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class HeaderInterceptorService {

    protected tokenService: TokenService = new TokenService()

    protected prepareHeader(headers?: HttpHeaders | null): object {
        headers = headers || new HttpHeaders()

        headers = headers.set('Content-Type', 'application/json')
        headers = headers.set('Accept', 'application/json')

        if (this.tokenService.hasToken()) {
            const token = this.tokenService.getToken()
            headers = headers.set('Authorization', 'Bearer ' + token)
        }

        return {
            headers: headers
        }
    }
}