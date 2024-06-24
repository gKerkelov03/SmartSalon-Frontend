import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsHistoryPageComponent } from './bookings-history-page.component';

describe('BookingsHistoryPageComponent', () => {
  let component: BookingsHistoryPageComponent;
  let fixture: ComponentFixture<BookingsHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingsHistoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingsHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
