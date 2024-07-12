import { classNames } from '@/utls/classnames';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React from 'react';

type NumberInputProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  toNext?: () => void;
  toPrevious?: () => void;
  max: number;
};

const NumberInput = Object.assign(
  React.forwardRef<HTMLSpanElement, NumberInputProps>(
    ({ value, setValue, ...props }, ref) => {
      const [hardSet, setHardSet] = React.useState(false); // adds 10 to value to prevent it's animation
      const preventAnimation = () => {
        setHardSet(true);
      };
      const [lastPres, setLastPress] = React.useState(new Date());
      const [lastTouch, setLastTouch] = React.useState([0, 0]);
      const [lastDragTime, setLastDragTime] = React.useState(new Date());

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
        if (event.key === 'Tab') {
          if (props.toNext && !event.shiftKey) props.toNext();
          else if (props.toPrevious) props.toPrevious();
        }
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
      const handleRelease = () => {
        setHardSet(false);
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
          onKeyUp={handleRelease}
          onTouchMove={handleTouch}
          ref={ref}
        >
          <div
            onClick={addValue}
            className="-my-1 z-10 text-gray-400 dark:text-zinc-500 "
          >
            <IconChevronUp />
          </div>
          <div className="text-3xl font-semibold font-mono h-8 w-8 items-center justify-center flex relative bg-gray-100 overflow-hidden rounded-md dark:bg-zinc-700/50">
            <div className="h-2 absolute left-0 right-0 top-0 z-10 bg-gradient-to-t from-transparent to-white dark:to-zinc-800 pointer-events-none"></div>
            <div className="h-2 absolute left-0 right-0 bottom-0 z-10 bg-gradient-to-b from-transparent to-white dark:to-zinc-800 pointer-events-none"></div>
            {Array(props.max + 1)
              .fill(0)
              .map((_, i) => {
                const half = Math.floor((props.max + 1) / 2);
                const displacement =
                  ((value - i + half + props.max + 1) % (props.max + 1)) - half;

                return (
                  <div
                    key={i}
                    className={classNames(
                      'absolute -translate-y-1/2 transition-all flex items-center justify-center',
                      !hardSet ? 'transition-300' : 'transition-none',
                    )}
                    style={{
                      top: `calc(${displacement * 40}px + 50%)`,
                      opacity: Math.abs(displacement) > 1 ? 0 : 1,
                    }}
                  >
                    <div className="bg-transparent items-center text-center cursor-pointer caret-transparent">
                      {i}
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

export default NumberInput;
