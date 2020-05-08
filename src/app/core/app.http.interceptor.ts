import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.user;

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          token: currentUser.token
        }
      });
    }

    return next.handle(request).pipe(catchError((error) => {
      if (error.status === 401) {
        this.authenticationService.invalidateUser();
      }

      return throwError(error);
    }));
  }
}
