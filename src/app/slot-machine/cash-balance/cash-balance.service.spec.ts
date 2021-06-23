import { TestBed } from '@angular/core/testing';

import { CashBalanceService } from './cash-balance.service';

describe('CashBalanceService', () => {
  let service: CashBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
