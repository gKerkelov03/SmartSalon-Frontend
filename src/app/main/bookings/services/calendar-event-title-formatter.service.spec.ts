import { TestBed } from '@angular/core/testing';

import { CalendarEventTitleFormatterService } from './calendar-event-title-formatter.service';

describe('CalendarEventTitleFormatterService', () => {
  let service: CalendarEventTitleFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarEventTitleFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
