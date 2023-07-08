import { screen, render } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('should render', () => {
    render(<Footer />);
    expect(screen.getByText(/Created by/)).toBeInTheDocument();
  });
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
});
