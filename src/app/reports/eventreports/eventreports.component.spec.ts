import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventreportsComponent } from './eventreports.component';

describe('EventreportsComponent', () => {
  let component: EventreportsComponent;
  let fixture: ComponentFixture<EventreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
