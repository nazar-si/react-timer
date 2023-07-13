import {
  Listbox,
  ListboxButtonProps,
  ListboxOptionProps,
  ListboxOptionsProps,
  ListboxProps,
  Transition,
} from '@headlessui/react';
import { IconChevronDown } from '@tabler/icons-react';
import React, { ElementType } from 'react';
import { style } from '../Button/Button';
import { createPortal } from 'react-dom';

const Select = {
  Root: Object.assign(
    (props: ListboxProps<ElementType, any, any>) => {
      return (
        <Listbox {...props}>
          <div className="relative mt-1">
            {props.children as React.ReactNode}
          </div>
        </Listbox>
      );
    },
    { displayName: 'Root' },
  ),
  Button: Object.assign(
    (props: ListboxButtonProps<ElementType>) => {
      return (
        <Listbox.Button
          {...props}
          className={
            'relative w-full outline-none px-2 py-1 rounded-md bg-white border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 shadow-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-all ring-0 ring-offset-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center dark:ring-offset-zinc-900 ' +
            props.className
          }
        >
          {props.children as React.ReactNode}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IconChevronDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
      );
    },
    { displayName: 'Button' },
  ),
  Options: Object.assign(
    (props: ListboxOptionsProps<ElementType>) => {
      const ref = React.useRef(null);
      const translate = (element: HTMLElement | null) => {
        if (!element) return 'translateY(0px)';
        const box = element!.getBoundingClientRect();
        return `translate(${box.left}px,${box.top}px)`;
      };
      return (
        <>
          <div ref={ref} className="w-full" />
          {createPortal(
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                style={{
                  transform: translate(ref.current),
                  // @ts-expect-error Ref is not null
                  width: ref.current?.clientWidth,
                }}
                className="absolute left-0 bg-white rounded-md border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-1 mt-2 ring-0 ring-offset-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-zinc-900 transition-all outline-none"
                {...props}
              >
                {props.children}
              </Listbox.Options>
            </Transition>,
            document.body,
          )}
        </>
      );
    },
    { displayName: 'Options' },
  ),

  Option: Object.assign(
    (props: ListboxOptionProps<ElementType, any>) => (
      <Listbox.Option
        className={({ active }: { active: boolean }) =>
          `relative cursor-default select-none rounded-sm py-1 px-2 transition-all ${
            active && 'bg-gray-100 dark:bg-zinc-700'
          }`
        }
        {...props}
      />
    ),
    { displayName: 'Option' },
  ),
};

export default Select;
