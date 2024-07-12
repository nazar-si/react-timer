import React, { useEffect, useState } from 'react';
import NumberInput from './NumberInput';

type Props = {
  value: number;
  setValue: (v: number) => void;
  // onChange?: (value: number) => void;
};
export default function ClockInput({ value, setValue }: Props) {
  const refs = React.useRef<Array<HTMLSpanElement | null>>(Array(4).fill(null));
  const focusDigit = (i: number) => {
    refs.current[i]?.focus();
  };
  const [valueState, setValueState] = useState([0, 0, 0, 0]);
  useEffect(() => {
    const seconds = value % 60;
    const minutes = Math.floor(value / 60) % 100;
    setValueState((state) => {
      const newState = [...state];
      newState.splice(3, 1, seconds % 10);
      return newState;
    });
    setValueState((state) => {
      const newState = [...state];
      newState.splice(2, 1, Math.floor(seconds / 10));
      return newState;
    });
    setValueState((state) => {
      const newState = [...state];
      newState.splice(1, 1, minutes % 10);
      return newState;
    });
    setValueState((state) => {
      const newState = [...state];
      newState.splice(0, 1, Math.floor(minutes / 10));
      return newState;
    });
  }, [value]);
  const useSetValue = (n: number) => (v: number | ((v: number) => number)) => {
    const values = valueState;
    let newV = 0;
    if (typeof v === 'function') {
      values[n] = v(values[n]);
      newV = v(values[n]);
    } else {
      values[n] = v;
      newV = v;
    }
    setValue(values[0] * 60 * 10 + values[1] * 60 + values[2] * 10 + values[3]);
    setValueState((state) => {
      const newState = [...state];
      newState.splice(n, 1, newV);
      return newState;
    });
  };
  return (
    <div className="flex gap-2 items-center relative group justify-center pt-6 my-2">
      <span className="absolute right-0 top-0 text-sm text-zinc-400 dark:text-zinc-500 transition-all duration-500 opacity-0 group-focus-within:opacity-100 ">
        {/* Use arrow keys or number input */}
      </span>
      <NumberInput
        value={valueState[0]}
        setValue={useSetValue(0)}
        max={5}
        ref={(r) => (refs.current[0] = r)}
        toNext={() => focusDigit(1)}
      />
      <NumberInput
        value={valueState[1]}
        setValue={useSetValue(1)}
        max={9}
        ref={(r) => (refs.current[1] = r)}
        toNext={() => focusDigit(2)}
        toPrevious={() => focusDigit(0)}
      />
      <span className="text-3xl font-bold opacity-50">:</span>
      <NumberInput
        value={valueState[2]}
        setValue={useSetValue(2)}
        max={5}
        ref={(r) => (refs.current[2] = r)}
        toNext={() => focusDigit(3)}
        toPrevious={() => focusDigit(1)}
      />
      <NumberInput
        value={valueState[3]}
        setValue={useSetValue(3)}
        max={9}
        ref={(r) => (refs.current[3] = r)}
        toPrevious={() => focusDigit(2)}
      />
    </div>
  );
}
