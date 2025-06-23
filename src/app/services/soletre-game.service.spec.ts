import { TestBed } from '@angular/core/testing';

import { SoletreGameService } from './soletre-game.service';

describe('SoletreGameService', () => {
  let service: SoletreGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoletreGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
