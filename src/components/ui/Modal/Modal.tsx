import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../../utls/classnames';
import { IconPlus } from '@tabler/icons-react';
import css from './Modal.module.css';

type Props = {
  children?: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

const style = {
  wrapper:
    'fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white/50 dark:bg-black/50 transition-all backdrop-blur-xl text-sm',
  wrapperClosed: 'opacity-0 pointer-events-none',
  containerClosed: 'scale-75',
  container:
    'duration-300 bg-white border border-zinc-300 dark:bg-zinc-800/50 dark:border-white/10 pt-5 pb-1 rounded-md relative max-w-xl w-full sm:w-2/3 md:w-1/2 mx-4 max-h-[90vh] overflow-hidden',
  closeButton:
    'absolute top-0 right-0 m-1 p-0.5 rounded-xl rotate-45 transition-all text-zinc-400 dark:text-zinc-600 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:hover:text-blue-400',
};

function Modal(props: Props) {
  const ref = useRef(null);
  const handleOusideClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== ref.current) return;
    props.setShow(false);
  };
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', props.show); // remove scroll
    const layout = document.querySelector('#layout') as Element;
    if (
      !props.show ||
      (props.show && document.documentElement.scrollHeight > window.innerHeight)
    )
      // if has scrollbar
      layout.classList.toggle('pr-[18px]', props.show); // compensate removed scroll
  }, [props.show]);
  return createPortal(
    <div
      ref={ref}
      role="dialog"
      className={classNames(style.wrapper, !props.show && style.wrapperClosed)}
      onClick={handleOusideClick}
    >
      <div
        className={classNames(
          style.container,
          !props.show && style.containerClosed,
          props.className,
        )}
      >
        <button
          aria-label="close modal"
          className={style.closeButton}
          onClick={() => props.setShow(false)}
        >
          <IconPlus strokeWidth={2} size={16} />
        </button>
        <div className={css.innerDiv}>{props.children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
