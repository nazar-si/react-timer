import { render } from '@testing-library/react';
import { vi } from 'vitest';

import App from './App';

describe('App', () => {
  it('Application renders', () => {
    render(<App />);
  });
});
