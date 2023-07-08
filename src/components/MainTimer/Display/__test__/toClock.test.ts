import toClock, { leftpad } from '../toClock';

describe('leftpad function test', () => {
  it('leftpad returns proper string', () => {
    expect(leftpad(12)).toBe('12');
  });
  it('leftpad pads string', () => {
    expect(leftpad(0)).toBe('00');
    expect(leftpad(5)).toBe('05');
    expect(leftpad(10)).toBe('10');
  });
});

describe('toClock function test', () => {
  it('shows seconds without minutes', () => {
    expect(toClock(10)).toStrictEqual(['00', '10']);
  });
  it('shows second and leftpads them', () => {
    expect(toClock(5)).toStrictEqual(['00', '05']);
  });
  it('does not allow for negative time', () => {
    expect(toClock(-10)).toStrictEqual(['00', '00']);
  });
  it('proper minutes display', () => {
    expect(toClock(4 * 60 + 20)).toStrictEqual(['04', '20']);
  });
  it('proper hours display', () => {
    expect(toClock(5 * 60 * 60 + 42 * 60)).toStrictEqual(['05', '42', '00']);
  });
  it('ignores fractional time', () => {
    expect(toClock(30.5)).toStrictEqual(['00', '30']);
  });
});
