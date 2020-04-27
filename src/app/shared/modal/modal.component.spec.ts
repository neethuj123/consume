import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      imports: [ TranslateModule.forRoot(), FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.popUpInput = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit modal close event', () => {
    spyOn(component.closePopup, 'emit');
    component.userComment = 'test';
    component.closePopUp(true);
    expect(component.closePopup.emit).toHaveBeenCalledWith({confirm: true, userComment: 'test' });
    expect(component.userComment).toEqual('');
  });
});
