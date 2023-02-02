import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenID = localStorage.getItem('token');

    if (tokenID) {
      const clone = req.clone({
        headers: req.headers.set("Authorization",tokenID)
      })
      return next.handle(clone);

    } else {
      return next.handle(req);
    }
  }
}
