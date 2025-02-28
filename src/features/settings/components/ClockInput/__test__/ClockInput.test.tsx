import { render, screen } from '@testing-library/react';
import ClockInput from '../ClockInput';

describe('ClockInput', () => {
  it('should render', () => {
    render(<ClockInput value={0} setValue={() => 0} />);
    const dials = screen.getAllByText('0');
    expect(dials.length).toBe(2);
  });
});
