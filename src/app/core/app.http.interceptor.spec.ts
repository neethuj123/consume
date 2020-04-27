import { ApiService } from './api.service';
import { environment } from './../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppHttpInterceptor } from './app.http.interceptor';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

describe('AppHttpInterceptor', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule],
      providers: [
        AppHttpInterceptor,
        {
          provide: AuthenticationService,
          useValue: {
            user: {user: 'data', token: 't0k3n'},
            invalidateUser() {}
          }
        }, {
          provide: HTTP_INTERCEPTORS,
          useClass: AppHttpInterceptor,
          multi: true
        }
      ]
    });

    apiService = TestBed.get(ApiService);
    httpTestingController = TestBed.get(HttpTestingController);
    authenticationService = TestBed.get(AuthenticationService);
  });

  afterEach(() => {
      httpTestingController.verify();
  });

  it('should set authorization token', () => {
      apiService.get('/codeNafFields').subscribe(() => {}, () => {});
      const req = httpTestingController.expectOne(`${environment.apiUrl}/codeNafFields`);
      req.flush([]);
      expect(req.request.headers.get('Authorization')).toEqual('t0k3n');
  });

  it('should invalidate user if user is unauthorized', () => {
      spyOn(authenticationService, 'invalidateUser');
      apiService.get('/codeNafFields').subscribe(() => {}, () => {});
      const req = httpTestingController.expectOne(`${environment.apiUrl}/codeNafFields`);
      req.flush({}, {status: 401, statusText: 'Unauthorized'});
      expect(req.request.headers.get('Authorization')).toEqual('t0k3n');
      expect(authenticationService.invalidateUser).toHaveBeenCalled();
  });

  it('should pass error if not 401', () => {
      spyOn(authenticationService, 'invalidateUser');
      apiService.get('/codeNafFields').subscribe(() => {}, () => {});
      const req = httpTestingController.expectOne(`${environment.apiUrl}/codeNafFields`);
      req.flush({}, {status: 404, statusText: 'not found'});
      expect(req.request.headers.get('Authorization')).toEqual('t0k3n');
      expect(authenticationService.invalidateUser).not.toHaveBeenCalled();
  });
});

describe('AppHttpInterceptor', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule],
      providers: [
        AppHttpInterceptor,
        {
          provide: AuthenticationService,
          useValue: {
            user: null
          }
        }, {
          provide: HTTP_INTERCEPTORS,
          useClass: AppHttpInterceptor,
          multi: true
        }
      ]
    });

    apiService = TestBed.get(ApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
      httpTestingController.verify();
  });

  it('should not set authorization token if user is null', () => {
      apiService.get('/codeNafFields').subscribe(() => {}, () => {});
      const req = httpTestingController.expectOne(`${environment.apiUrl}/codeNafFields`);
      req.flush([]);
      expect(req.request.headers.get('Authorization')).toEqual(null);
  });
});
