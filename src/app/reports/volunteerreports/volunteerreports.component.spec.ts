import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerreportsComponent } from './volunteerreports.component';

describe('VolunteerreportsComponent', () => {
  let component: VolunteerreportsComponent;
  let fixture: ComponentFixture<VolunteerreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
