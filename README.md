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

  private authorization = 'Basic 123456-123456';
  private urlRedirect401 = '/login';
  private headers = {
    'Authorization': this.authorization,
    'Content-Type': 'application/json'
  };

  constructor(public router: Router) {
    super(router);
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








