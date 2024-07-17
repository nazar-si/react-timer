import { screen, render } from '@testing-library/react';
import Footer from '../Footer';

const MockLayout = () => (
  <div id="layout">
    <Footer />
  </div>
);

describe('Footer', () => {
  it("should contain link to author's github", () => {
    render(<MockLayout />);
    expect(screen.getByText(/Entropy Concept/i)).toHaveAttribute(
      'href',
      'https://github.com/EntropyConcept',
    );
  });
  it('should contain link to github repo', () => {
    render(<MockLayout />);
    expect(screen.getByLabelText(/github link/i)).toHaveAttribute(
      'href',
      'https://github.com/nazar-si/pomodoro/',
    );
  });
  it('should have language swithing button', () => {
    render(<MockLayout />);
    expect(screen.getByLabelText(/language switch/i)).toBeInTheDocument();
  });
});
