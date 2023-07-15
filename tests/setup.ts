import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

global.ResizeObserver = require('resize-observer-polyfill');
vi.mock('worker-timers', () => ({
  clearInterval,
  setInterval: (func: () => void, delay: number | undefined) =>
    setInterval(func, delay),
  clearTimeout,
  setTimeout: (func: () => void, delay: number | undefined) =>
    setTimeout(func, delay),
}));
