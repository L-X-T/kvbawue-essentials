import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightValidationErrorComponent } from './flight-validation-error.component';

describe('FlightValidationErrorComponent', () => {
  let component: FlightValidationErrorComponent;
  let fixture: ComponentFixture<FlightValidationErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightValidationErrorComponent]
    });
    fixture = TestBed.createComponent(FlightValidationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
