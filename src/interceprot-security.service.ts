import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Router } from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';
import 'rxjs/add/operator/do';

@Injectable()
export class InterceptorSecurityService {

    constructor(private router: Router, private sg: SimpleGlobal) {}
    
      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        return next.handle(req).do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('InterceptorSecurityService - Request - OK');
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                console.log('InterceptorSecurityService - Request - 401');
                this.router.navigate([ this.getUrlLoginRedirect() ]);
            }
          }
        });
    
      }
    
      getUrlLoginRedirect(): string {
        return '/login';
      }

}