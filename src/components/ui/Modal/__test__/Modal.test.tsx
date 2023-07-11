import { render, screen, act } from '@testing-library/react';
import React from 'react';
import Modal from '../Modal';
import { beforeEach } from 'vitest';

beforeEach(()=>{
  Object.defineProperty(window, "innerHeight", 0);
})

describe('Modal', () => {
  it('should display same children', () => {
    
    render(
      <Modal show={true} setShow={(a) => a}>
        TEST HERE
        <div id="#layout"></div>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveTextContent('TEST HERE');
  });
  it('should close when clicking close button', () => {
    const MockContainer = () => {
      const [show, setShow] = React.useState(true);
      return (
        <Modal show={show} setShow={setShow}>
          TEST HERE
        </Modal>
      );
    };
    render(<MockContainer />);
    const closeButton = screen.getByLabelText('close modal');
    const dialog = screen.getByRole('dialog');
    expect(dialog.classList.contains('opacity-0')).toBe(false);
    act(() => {
      closeButton.click();
    });
    expect(dialog.classList.contains('opacity-0')).toBe(true);
  });
  it('should close when clicking outside', () => {
    const MockContainer = () => {
      const [show, setShow] = React.useState(true);
      return (
        <Modal show={show} setShow={setShow}>
          TEST HERE
        </Modal>
      );
    };
    render(<MockContainer />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.classList.contains('opacity-0')).toBe(false);
    act(() => {
      dialog.click();
    });
    expect(screen.queryByRole('dialog')?.classList.contains('opacity-0')).toBe(
      true,
    );
  });
  it('should not close when clicking inside', () => {
    const MockContainer = () => {
      const [show, setShow] = React.useState(true);
      return (
        <Modal show={show} setShow={setShow}>
          <button aria-label="do nothing">Test</button>
        </Modal>
      );
    };
    render(<MockContainer />);
    const dialog = screen.getByRole('dialog');
    const button = screen.getByLabelText('do nothing');
    expect(dialog.classList.contains('opacity-0')).toBe(false);
    act(() => {
      button.click();
    });
    expect(screen.queryByRole('dialog')?.classList.contains('opacity-0')).toBe(
      false,
    );
  });
});
