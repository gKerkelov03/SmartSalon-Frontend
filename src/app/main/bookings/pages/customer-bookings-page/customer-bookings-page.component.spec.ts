import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBookingsPageComponent } from './customer-bookings-page.component';

describe('CustomerBookingsPageComponent', () => {
  let component: CustomerBookingsPageComponent;
  let fixture: ComponentFixture<CustomerBookingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerBookingsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerBookingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
