import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonWorkingTimeComponent } from './salon-working-time.component';

describe('SalonWorkingTimeComponent', () => {
  let component: SalonWorkingTimeComponent;
  let fixture: ComponentFixture<SalonWorkingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonWorkingTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonWorkingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
