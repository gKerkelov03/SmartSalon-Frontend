import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerActiveBookingsPageComponent } from './customer-active-bookings-page.component';

describe('CustomerActiveBookingsPageComponent', () => {
  let component: CustomerActiveBookingsPageComponent;
  let fixture: ComponentFixture<CustomerActiveBookingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerActiveBookingsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerActiveBookingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
