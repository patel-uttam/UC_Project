import { TestBed } from '@angular/core/testing';

import { ManagingUsersAccountService } from './managing-users-account.service';

describe('ManagingUsersAccountService', () => {
  let service: ManagingUsersAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagingUsersAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
