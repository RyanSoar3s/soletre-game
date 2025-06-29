import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { soletreGameActiveGuard } from './soletre-game-active.guard';

describe('soletreGameActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => soletreGameActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
