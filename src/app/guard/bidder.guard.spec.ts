import { TestBed } from '@angular/core/testing';

import { BidderGuard } from './bidder.guard';

describe('BidderGuard', () => {
  let guard: BidderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BidderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
