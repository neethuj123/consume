import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadMoreComponent } from './read-more.component';

describe('ReadMoreComponent', () => {
  let component: ReadMoreComponent;
  let fixture: ComponentFixture<ReadMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreComponent);
    component = fixture.componentInstance;
    component.maxLength = 15;
    component.comment = 'Short Comment';
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should toggle view for short comment', () => {
    fixture.detectChanges();

    expect(component.isCollapsed).toBeTruthy();
    component.toggleView();
    expect(component.isCollapsed).toBeFalsy();
    expect(component.showReadMoreLessLink).toBeFalsy();
    expect(component.currentText).toEqual('Short Comment');
  });

  it('should show shortened comment for long comment', () => {
    component.comment = 'Comment with length greater than 10';
    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.isCollapsed).toBeTruthy();
    expect(component.showReadMoreLessLink).toBeTruthy();
    expect(component.currentText).toEqual('Comment with le...');
  });

  it('should toggle view of shortened comment for long comment', () => {
    component.comment = 'Comment with length greater than 10';
    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.isCollapsed).toBeTruthy();
    expect(component.showReadMoreLessLink).toBeTruthy();
    expect(component.currentText).toEqual('Comment with le...');

    component.toggleView();
    expect(component.isCollapsed).toBeFalsy();
    expect(component.currentText).toEqual('Comment with length greater than 10');
  });
});
