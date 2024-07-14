import { classNames } from '@/utls/classnames';
import { OTPInput, SlotProps } from 'input-otp';
import React, { useCallback, useMemo, useState } from 'react';

type Props = {
  value: number;
  setValue: (v: number) => void;
  // onChange?: (value: number) => void;
};

const style = {
  // number:
  //   'text-3xl font-semibold font-mono h-8 w-8 items-center justify-center flex relative bg-black/5 overflow-hidden rounded-md dark:bg-white/5 outline-none mx-0.5 ring-0 ring-offset-0 ring-offset-white dark:ring-offset-zinc-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all',
  number:
    'text-3xl font-semibold font-mono h-8 w-8 items-center justify-center flex bg-black/5 rounded-md dark:bg-white/5 outline-none mx-0.5 ring-0 ring-offset-0 ring-offset-white dark:ring-offset-zinc-800 transition-all',
  numberActive: 'ring-2 ring-offset-2 ring-blue-500 text-blue-500',
  numberInput:
    '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center',
};

export default function ClockInput({ value, setValue }: Props) {
  const valueArray = useMemo(() => {
    const seconds = value % 60;
    const minutes = Math.min(Math.floor(value / 60), 99);
    return [
      Math.floor(minutes / 10),
      minutes % 10,
      Math.floor(seconds / 10),
      seconds % 10,
    ];
  }, [value]);

  const valueString = useMemo(() => {
    const newValue = [...valueArray];
    return newValue.join('');
  }, [valueArray]);

  const [internalState, setInternalState] = useState(valueString);

  const setValueString = useCallback(
    (value: string) => {
      const values = [...value]
        .slice(0, 4)
        .map((num: string) => parseInt(num) ?? 0);

      if (values[2] !== undefined) values[2] = Math.min(values[2], 5);

      setValue(
        (values[0] ?? 0) * 60 * 10 +
          (values[1] ?? 0) * 60 +
          (values[2] ?? 0) * 10 +
          (values[3] ?? 0),
      );
      setInternalState(values.join(''));
    },
    [setValue],
  );

  return (
    <div className="flex gap-2 items-center relative group justify-center pt-6 my-2 selection:text-blue-500">
      <span className="absolute right-0 top-0 text-sm text-zinc-400 dark:text-zinc-500 transition-all duration-500 opacity-0 group-focus-within:opacity-100 ">
        {/* Use arrow keys or number input */}
      </span>
      <OTPInput
        value={internalState}
        onChange={setValueString}
        maxLength={4}
        inputMode="numeric"
        pushPasswordManagerStrategy="none"
        containerClassName="group flex items-center"
        className="caret-transparent"
        onBlur={() => setValueString((internalState + '0000').slice(0, 4))}
        render={({ slots }) => (
          <>
            <div className="flex gap-1">
              {slots.slice(0, 2).map((slot, idx) => (
                <NumberSlot key={idx} {...slot} />
              ))}
            </div>

            <span className="text-3xl font-bold opacity-50 mx-1 mb-1">:</span>

            <div className="flex gap-1">
              {slots.slice(2).map((slot, idx) => (
                <NumberSlot key={idx} {...slot} />
              ))}
            </div>
          </>
        )}
      />
    </div>
  );
}

function NumberSlot(props: SlotProps) {
  return (
    <div
      className={classNames(style.number, props.isActive && style.numberActive)}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.char === null && (
        <div className="text-gray-400 dark:text-gray-500">0</div>
      )}
    </div>
  );
}
