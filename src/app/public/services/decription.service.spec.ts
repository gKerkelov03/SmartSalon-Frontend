import { TestBed } from '@angular/core/testing';

import { DecriptionService } from './decription.service';

describe('DecriptionService', () => {
  let service: DecriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
