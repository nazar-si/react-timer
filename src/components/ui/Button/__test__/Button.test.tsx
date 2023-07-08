import { screen, render } from '@testing-library/react';
import Button from '../Button';
import React from 'react';

describe('Button', () => {
  it('should display same name', () => {
    render(<Button>TEST HERE</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('TEST HERE');
  });
  it('should allow for ref forwarding', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>TEST HERE</Button>);
    expect(ref.current!.innerHTML).toBe('TEST HERE');
  });
  it('should allow for custom class', () => {
    render(<Button className="custom-class">TEST HERE</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
