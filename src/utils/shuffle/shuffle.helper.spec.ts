import { shuffle } from './shuffle.helper';

describe('shuffle helper', () => {
  beforeEach(() => {
    // mock Math.random to for predictable results
    jest
      .spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.5);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('should shuffle number array', () => {
    let shuffled = shuffle([1, 2, 3, 4, 5]);
    expect(shuffled).toEqual([4, 2, 5, 1, 3]);
  });

  it('should shuffle object array', () => {
    let shuffled = shuffle([
      { a: 'h' },
      { a: 'e' },
      { a: 'l' },
      { a: 'l' },
      { a: 'o' },
    ]);
    expect(shuffled).toEqual([
      { a: 'l' },
      { a: 'e' },
      { a: 'o' },
      { a: 'h' },
      { a: 'l' },
    ]);
  });
});
