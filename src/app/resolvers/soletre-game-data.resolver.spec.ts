import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { soletreGameDataResolver } from './soletre-game-data.resolver';

describe('soletreGameDataResolver', () => {
  const executeResolver: ResolveFn<void> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => soletreGameDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
