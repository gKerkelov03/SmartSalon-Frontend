import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSubscriptionsPageComponent } from './customer-subscriptions-page.component';

describe('CustomerSubscriptionsPageComponent', () => {
  let component: CustomerSubscriptionsPageComponent;
  let fixture: ComponentFixture<CustomerSubscriptionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSubscriptionsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSubscriptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
