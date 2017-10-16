import { Injectable } from '@angular/core';
import { HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export abstract class InterceptorSecurityService implements HttpInterceptor {   

    protected urlRedirect401?: string;
    protected headers = {
      'Content-Type': 'application/json'
    };    

    constructor(public router: Router) {
      console.log('InterceptorSecurityService - constructor()...');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      req = req.clone({ setHeaders: this.headers });
      return next.handle(req).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('InterceptorSecurityService - Request - OK');
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
              console.log('InterceptorSecurityService - Request - 401');
              this.router.navigate([ this.urlRedirect401 ]);
          }
        }
      });

    }

    //abstract getUrlLoginRedirect(): string;

}
