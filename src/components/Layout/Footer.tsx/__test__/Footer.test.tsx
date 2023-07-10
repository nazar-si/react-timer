import { screen, render } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it("should contain link to author's github", () => {
    render(<Footer />);
    expect(screen.getByText(/Nazar Si/i)).toHaveAttribute(
      'href',
      'https://github.com/nazar-si/',
    );
  });
  it('should contain link to github repo', () => {
    render(<Footer />);
    expect(screen.getByLabelText(/github link/i)).toHaveAttribute(
      'href',
      'https://github.com/nazar-si/pomodoro/',
    );
  });
  it('should have language swithing button', () => {
    render(<Footer />);
    expect(screen.getByLabelText(/language switch/i)).toBeInTheDocument();
  });
});
