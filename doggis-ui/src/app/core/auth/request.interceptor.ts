import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/providers';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<HttpSentEvent
         | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        if (this.tokenService.hasToken()) {
            const token = this.tokenService.getToken()
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) })
        }

        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') })
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') })
        return next.handle(req);
    }
}