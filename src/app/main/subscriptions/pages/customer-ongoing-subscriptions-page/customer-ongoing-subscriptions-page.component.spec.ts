import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOngoingSubscriptionsPageComponent } from './customer-ongoing-subscriptions-page.component';

describe('CustomerOngoingSubscriptionsPageComponent', () => {
  let component: CustomerOngoingSubscriptionsPageComponent;
  let fixture: ComponentFixture<CustomerOngoingSubscriptionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOngoingSubscriptionsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerOngoingSubscriptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
