import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsHandlerPageComponent } from './emails-handler-page.component';

describe('EmailsHandlerPageComponent', () => {
  let component: EmailsHandlerPageComponent;
  let fixture: ComponentFixture<EmailsHandlerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailsHandlerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailsHandlerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
