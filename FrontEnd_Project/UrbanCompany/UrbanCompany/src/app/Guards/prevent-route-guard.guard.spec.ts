import { TestBed } from '@angular/core/testing';

import { PreventRouteGuardGuard } from './prevent-route-guard.guard';

describe('PreventRouteGuardGuard', () => {
  let guard: PreventRouteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventRouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
