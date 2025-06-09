import { ValidateCharPipe } from './validate-char.pipe';

describe('ValidateCharPipe', () => {
  it('create an instance', () => {
    const pipe = new ValidateCharPipe();
    expect(pipe).toBeTruthy();
  });
});
