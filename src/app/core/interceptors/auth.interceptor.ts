import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  #userService:UserService=inject(UserService);
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.#userService.currentUser?.token;
    if (token) {
      request = request.clone({
        setHeaders: {
          access_token: token
        }
      })
    }
    return next.handle(request);
  }
}
