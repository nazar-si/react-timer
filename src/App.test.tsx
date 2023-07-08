import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Application renders', () => {
    render(<App />);
  });
});