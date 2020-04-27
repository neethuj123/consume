import { AuthenticationService } from './../../../core/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown', () => {
    expect(component.isUserDropdownOpen).toBeFalsy();
    component.toggleUserDropdown();
    expect(component.isUserDropdownOpen).toBeTruthy();
  });

  it('should invoke logout', () => {
    const mockEvent = {
      preventDefault() {}
    };
    const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    spyOn(authenticationService, 'logout');
    component.logOut(mockEvent);
    expect(authenticationService.logout).toHaveBeenCalled();
  });
});
