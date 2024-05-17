import { OnlyHourAndMinutesPipe } from './only-hour-and-minutes.pipe';

describe('OnlyHourAndMinutesPipe', () => {
  it('create an instance', () => {
    const pipe = new OnlyHourAndMinutesPipe();
    expect(pipe).toBeTruthy();
  });
});
