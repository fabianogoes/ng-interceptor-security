# Interceptor Security Angular 4

### Como usar


* Instalar   

```shell
npm install --save ng-interceptor-security
```

* Criar um Service    

```shell
ng g s redirect-interceptor
```  


* Implementar   

```js
...
import { InterceptorSecurityService } from 'ng-interceptor-security';
...

export class RedirectInterceptorService extends InterceptorSecurityService  {

  constructor(public router: Router) {
    super(router);
  }

  getUrlLoginRedirect(): string {
    return '/login';
  }

}
```   

* Adicionar a Service como provider no Module

```js
...
import { RedirectInterceptorService } from './redirect-interceptor.service';
...

...
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RedirectInterceptorService,
      multi: true
    }
  ],
...

```








