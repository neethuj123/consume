import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHistoryComponent } from './app-history.component';

describe('AppHistoryComponent', () => {
  let component: AppHistoryComponent;
  let fixture: ComponentFixture<AppHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
