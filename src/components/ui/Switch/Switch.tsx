import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { classNames } from '../../../utls/classnames';

export interface Props {
  value?: boolean;
  onChange?: (checked: boolean) => void;
  checkmark?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function Example({
  value,
  onChange,
  disabled,
  checkmark,
  ...props
}: Props) {
  const [enabled, setEnabled] = useState(value === undefined ? false : value);

  return (
    <Switch
      checked={enabled}
      disabled={disabled}
      onChange={() => {
        setEnabled(!enabled);
        onChange?.(!enabled);
      }}
      className={classNames(
        enabled ? 'bg-blue-500' : 'bg-zinc-200 dark:bg-black',
        'dark:ring-offset-black relative inline-flex flex-shrink-0 h-4 w-8 m-1 border border-zinc-300 dark:border-white/20 rounded-full cursor-pointer ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all',
        disabled && 'opacity-50 pointer-events-none'
      )}
      style={{ ...props.style }}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          enabled ? 'translate-x-4' : 'translate-x-0',
          'pointer-events-none relative inline-block h-3 w-3 m-[1px] rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
        )}
      >
        <span
          className={classNames(
            enabled
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
          )}
          aria-hidden="true"
        >
          {checkmark && (
            <svg
              className="h-3 w-3 text-zinc-400"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span
          className={classNames(
            enabled
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
          )}
          aria-hidden="true"
        >
          {checkmark && (
            <svg
              className="h-3 w-3 text-blue-500"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          )}
        </span>
      </span>
    </Switch>
  );
}
