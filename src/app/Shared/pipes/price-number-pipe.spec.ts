import { PriceNumberPipe } from './price-number-pipe';

describe('PriceNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
