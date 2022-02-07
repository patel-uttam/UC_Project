import { TestBed } from '@angular/core/testing';

import { ProviderGuardGuard } from './provider-guard.guard';

describe('ProviderGuardGuard', () => {
  let guard: ProviderGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProviderGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
