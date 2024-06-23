import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonSchedulePageComponent } from './salon-schedule-page.component';

describe('SalonSchedulePageComponent', () => {
  let component: SalonSchedulePageComponent;
  let fixture: ComponentFixture<SalonSchedulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonSchedulePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
