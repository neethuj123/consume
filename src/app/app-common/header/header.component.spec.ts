import { SharedDataService } from './../../shared/shared-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ HeaderComponent, UserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide navigation in home route', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ul .navbar-nav')).toBeNull();
  });

  it('should navigation to search without query, if no recent search available', () => {
    const router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigateByUrl');
    component.navigateToSearchPage();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/configure/scorecard/search');
  });

  it('should navigation to search with query, if recent search available', () => {
    const router = fixture.debugElement.injector.get(Router);
    const sharedDataService = fixture.debugElement.injector.get(SharedDataService);
    spyOn(router, 'navigateByUrl');
    sharedDataService.searchedUserId = 'U123';
    component.navigateToSearchPage();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/configure/scorecard/search?query=U123');
  });
});
