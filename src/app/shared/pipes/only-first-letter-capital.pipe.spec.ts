import { OnlyFirstLetterCapitalPipe } from './only-first-letter-capital.pipe';

describe('OnlyFirstLetterCapitalPipe', () => {
  it('create an instance', () => {
    const pipe = new OnlyFirstLetterCapitalPipe();
    expect(pipe).toBeTruthy();
  });
});
