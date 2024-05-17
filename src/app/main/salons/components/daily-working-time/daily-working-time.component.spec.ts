import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWorkingTimeComponent } from './daily-working-time.component';

describe('DailyWorkingTimeComponent', () => {
  let component: DailyWorkingTimeComponent;
  let fixture: ComponentFixture<DailyWorkingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyWorkingTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyWorkingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
