import { TestBed } from '@angular/core/testing';

import { ValidateSoletreGameService } from './validate-soletre-game.service';

describe('ValidateSoletreGameService', () => {
  let service: ValidateSoletreGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateSoletreGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
