import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerBookingsPageComponent } from './worker-bookings-page.component';

describe('WorkerBookingsPageComponent', () => {
  let component: WorkerBookingsPageComponent;
  let fixture: ComponentFixture<WorkerBookingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerBookingsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerBookingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
