import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { winnerActiveGuard } from './winner-active.guard';

describe('winnerActiveGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => winnerActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
