import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHistoryPageComponent } from './customer-history-page.component';

describe('CustomerHistoryPageComponent', () => {
  let component: CustomerHistoryPageComponent;
  let fixture: ComponentFixture<CustomerHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerHistoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
