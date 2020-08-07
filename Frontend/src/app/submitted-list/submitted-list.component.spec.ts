import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedListComponent } from './submitted-list.component';

describe('SubmittedListComponent', () => {
  let component: SubmittedListComponent;
  let fixture: ComponentFixture<SubmittedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
