import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React, { Dispatch, forwardRef, useEffect, useState } from 'react';

type NumberInputProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  toNext?: () => void;
  toPrevious?: () => void;
  max: number;
};

const NumberInput = Object.assign(
  forwardRef<HTMLSpanElement, NumberInputProps>(
    ({ value, setValue, ...props }, ref) => {
      const [hardSet, setHardSet] = useState(0); // adds 10 to value to prevent it's animation
      const preventAnimation = () => setHardSet((s) => 1 - s);
      const [lastPres, setLastPress] = useState(new Date());
      const [lastTouch, setLastTouch] = useState([0, 0]);
      const [lastDragTime, setLastDragTime] = useState(new Date());

      const reduceValue = () => {
        if (value === 0) {
          setValue(props.max);
          return;
        }
        setValue((v) => v - 1);
      };
      const addValue = () => {
        if (value === props.max) {
          setValue(0);
          return;
        }
        setValue((v) => v + 1);
      };
      const handleKeyboard = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        event.preventDefault();
        if (event.key === 'ArrowUp') {
          addValue();
          setLastPress(new Date()); // prevent animation on key press
          if (new Date().valueOf() - lastPres.valueOf() < 100) {
            preventAnimation();
          }
        }
        if (event.key === 'ArrowDown') {
          reduceValue();
          setLastPress(new Date());
          if (new Date().valueOf() - lastPres.valueOf() < 100) {
            preventAnimation();
          }
        }
        if (event.key === 'ArrowLeft' && props.toPrevious) props.toPrevious();
        if (event.key === 'ArrowRight' && props.toNext) props.toNext();
        if (event.key === 'Backspace') {
          setValue(0);
          preventAnimation();
          if (props.toPrevious) props.toPrevious();
        }
        const num = parseInt(event.key);
        if (isNaN(num)) return;
        if (num > props.max) setValue(props.max);
        else setValue(num);
        preventAnimation();
        if (props.toNext) props?.toNext();
      };
      const handleTouch = (event: React.TouchEvent<HTMLSpanElement>) => {
        const touch = [
          event.changedTouches[0].clientX,
          event.changedTouches[0].clientY,
        ];
        setLastTouch(touch);
        const len =
          (lastTouch[0] - touch[0]) ** 2 + (lastTouch[1] - touch[1]) ** 2;
        const dir = Math.atan2(
          touch[1] - lastTouch[1],
          touch[0] - lastTouch[0],
        );
        if (len > 4 && new Date().valueOf() - lastDragTime.valueOf() > 300) {
          if (dir > 0) addValue();
          else reduceValue();
          setLastDragTime(new Date());
        }
      };

      return (
        <span
          tabIndex={0}
          className="flex flex-col inline-block w-fit items-center ring-0 ring-offset-0 ring-offset-white dark:ring-offset-zinc-800 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 rounded-md cursor-pointer outline-none"
          onKeyDown={handleKeyboard}
          onTouchMove={handleTouch}
          ref={ref}
        >
          <div
            onClick={addValue}
            className="-my-1 z-10 text-gray-400 dark:text-zinc-500 "
          >
            <IconChevronUp />
          </div>
          <div className="text-3xl font-bold h-8 w-8 items-center justify-center flex relative overflow-hidden bg-gray-100 rounded-md dark:bg-zinc-700/50">
            <div className="h-2 absolute left-0 right-0 top-0 z-10 bg-gradient-to-t from-transparent to-white dark:to-zinc-800 pointer-events-none"></div>
            <div className="h-2 absolute left-0 right-0 bottom-0 z-10 bg-gradient-to-b from-transparent to-white dark:to-zinc-800 pointer-events-none"></div>
            {Array(props.max)
              .fill(0)
              .map((_, i) => {
                return (
                  <div
                    key={((i + value) % (props.max + 1)) + hardSet * 10}
                    className={
                      'absolute -translate-y-1/2 transition-all duration-200 flex items-center justify-center'
                    }
                    style={{
                      top: `calc(50% - ${
                        (i - Math.floor(props.max / 2)) * 40
                      }px)`,
                    }}
                  >
                    <div className="bg-transparent items-center text-center cursor-pointer caret-transparent">
                      {(i + value + Math.floor(props.max / 2) + 2) %
                        (props.max + 1)}
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            onClick={reduceValue}
            className="-my-1 z-10 text-gray-400 dark:text-zinc-500"
          >
            <IconChevronDown />
          </div>
        </span>
      );
    },
  ),
  { displayName: 'NumberInput' },
);

type Props = {
  value: number;
  setValue: (v: number) => void;
  // onChange?: (value: number) => void;
};
export default function ClockInput({ value, setValue }: Props) {
  const refs = React.useRef<Array<HTMLSpanElement | null>>(Array(4).fill(null));
  const Focus = (i: number) => {
    refs.current[i]?.focus();
  };
  const [valueState, setValueState] = useState([0, 0, 0, 0]);
  useEffect(() => {
    const seconds = value % 60;
    const minutes = Math.floor(value / 60) % 100;
    setValueState((state) => {
      state.splice(3, 1, seconds % 10);
      return state;
    });
    setValueState((state) => {
      state.splice(2, 1, Math.floor(seconds / 10));
      return state;
    });
    setValueState((state) => {
      state.splice(1, 1, minutes % 10);
      return state;
    });
    setValueState((state) => {
      state.splice(0, 1, Math.floor(minutes / 10));
      return state;
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
      state.splice(n, 1, newV);
      return state;
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
        max={9}
        ref={(r) => (refs.current[0] = r)}
        toNext={() => Focus(1)}
      />
      <NumberInput
        value={valueState[1]}
        setValue={useSetValue(1)}
        max={9}
        ref={(r) => (refs.current[1] = r)}
        toNext={() => Focus(2)}
        toPrevious={() => Focus(0)}
      />
      <span className="text-3xl font-bold opacity-50">:</span>
      <NumberInput
        value={valueState[2]}
        setValue={useSetValue(2)}
        max={5}
        ref={(r) => (refs.current[2] = r)}
        toNext={() => Focus(3)}
        toPrevious={() => Focus(1)}
      />
      <NumberInput
        value={valueState[3]}
        setValue={useSetValue(3)}
        max={9}
        ref={(r) => (refs.current[3] = r)}
        toPrevious={() => Focus(2)}
      />
    </div>
  );
}
