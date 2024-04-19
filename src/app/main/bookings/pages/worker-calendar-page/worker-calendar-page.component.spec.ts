import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCalendarPageComponent } from './worker-calendar-page.component';

describe('WorkerCalendarPageComponent', () => {
  let component: WorkerCalendarPageComponent;
  let fixture: ComponentFixture<WorkerCalendarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerCalendarPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerCalendarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
