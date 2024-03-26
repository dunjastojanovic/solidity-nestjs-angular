import { TestBed } from '@angular/core/testing';

import { DailyExpenseService } from './daily-expense.service';

describe('DailyExpenseService', () => {
  let service: DailyExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
