import { AuthenticationService } from './authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        AuthGuard,
        {
          provide: AuthenticationService,
          useValue: {
            user: {name: 'test user'}
          }
        }
      ]
    });

    authGuard = TestBed.get(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should do auth - success', () => {
    const route: ActivatedRouteSnapshot = null;
    const state: RouterStateSnapshot = null;
    expect(authGuard.canActivate(route, state)).toBeTruthy();
  });
});

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        AuthGuard,
        {
          provide: AuthenticationService,
          useValue: {
            user: null
          }
        }
      ]
    });

    authGuard = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
  });

  it('should do auth - fail', () => {
    spyOn(router, 'navigate');
    const route: ActivatedRouteSnapshot = null;
    const state: RouterStateSnapshot = null;
    expect(authGuard.canActivate(route, state)).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
