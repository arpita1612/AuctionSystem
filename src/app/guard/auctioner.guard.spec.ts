import { TestBed } from '@angular/core/testing';

import { AuctionerGuard } from './auctioner.guard';

describe('AuctionerGuard', () => {
  let guard: AuctionerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuctionerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
