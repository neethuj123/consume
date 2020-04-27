import { environment } from './../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { TestBed } from '@angular/core/testing';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ AuthenticationService ]
    });

    authenticationService = TestBed.get(AuthenticationService);
    httpTestingController = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
  });

  afterEach(() => {
      httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should be able to login', () => {
    const testUser = {name: 'tester', userRole: 'testRole'};
    authenticationService.login('test', 'testpwd')
      .subscribe((user) => {
        expect(user).toEqual(testUser);
      });
    const req = httpTestingController.expectOne(`${environment.apiUrl}/../user/login`);
    req.flush(testUser);
    expect(req.request.body).toEqual({userName: 'test', password: 'testpwd'});
    expect(authenticationService.user).toEqual(testUser);
    expect(authenticationService.userRole).toEqual('testRole');
  });

  it('should be able to login with token', () => {
    const testUser = {name: 'tester'};
    authenticationService.loginWithToken('t0k3nSt61ng')
      .subscribe((user) => {
        expect(user).toEqual(testUser);
        expect(authenticationService.user).toEqual(testUser);
      });
    const req = httpTestingController.expectOne(`${environment.apiUrl}/../user/login`);
    req.flush(testUser);
    expect(req.request.body).toEqual({token: 't0k3nSt61ng'});
  });

  it('should be able to logout', () => {
    const testUser = {};
    spyOn(router, 'navigateByUrl');
    spyOn(authenticationService, 'invalidateUser').and.callThrough();
    authenticationService.logout();
    const req = httpTestingController.expectOne(`${environment.apiUrl}/user/logout`);
    req.flush(testUser);
    expect(authenticationService.invalidateUser).toHaveBeenCalled();
    expect(authenticationService.user).toEqual(null);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should be able to login, but no user details', () => {
    authenticationService.login('test', 'testpwd')
      .subscribe((user) => {
        expect(user).toBeNull();
      });
    const req = httpTestingController.expectOne(`${environment.apiUrl}/../user/login`);
    req.flush(null);
    expect(req.request.body).toEqual({userName: 'test', password: 'testpwd'});
    expect(authenticationService.user).toBeNull();
    expect(authenticationService.userRole).toBeNull();
  });
});
