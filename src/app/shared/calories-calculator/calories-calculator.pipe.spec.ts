import { CaloriesCalculatorPipe } from './calories-calculator.pipe';

describe('CaloriesCalculatorPipe', () => {
  it('create an instance', () => {
    const pipe = new CaloriesCalculatorPipe();
    expect(pipe).toBeTruthy();
  });
});
