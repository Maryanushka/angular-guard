import { TestBed } from '@angular/core/testing';

import { AuthenticaionGuard } from './authenticaion.guard';

describe('AuthenticaionGuard', () => {
  let guard: AuthenticaionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticaionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
