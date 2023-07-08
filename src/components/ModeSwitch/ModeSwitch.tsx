import { useState } from 'react';
import Button from '../ui/Button/Button';
import useTimerStore from '../../store/timer/timer';

const modeStyle = 'rounded-md px-1 py-2 flex-1 relative';
const indicatorStyle =
  'absolute h-1 w-1/3 left-1/2 -translate-x-1/2 bottom-0 rounded-t-md transition-all duration-300 opacity-0';
const indicatorActiveStyle = 'opacity-100 w-2/3';

const modes = {
  work: {
    color: 'bg-blue-500',
    name: 'Work',
  },
  break: {
    color: 'bg-teal-500',
    name: 'Break',
  },
  longBreak: {
    color: 'bg-indigo-500',
    name: 'Long Break',
  },
};

export default function ModeSwitch() {
  const [hovered, setHovered] = useState(0);
  const mode = useTimerStore((state) => state.mode);
  const setMode = useTimerStore((state) => state.setMode);
  return (
    <Button
      aria-label="switch-timer-mode"
      className="px-1 !py-0 flex items-center relative group flex-1"
    >
      <div
        className="bg-zinc-200/75 dark:bg-zinc-500/25 box-content h-8 rounded-md absolute z-index-0 pointer-events-none transition-all opacity-0 group-hover:opacity-100"
        style={{
          left: `calc(${32 * hovered}% + 4px)`,
          right: `calc(${32 * (2 - hovered)}% + 4px)`,
        }}
      ></div>
      {Object.entries(modes).map(([key, value], i) => (
        <div
          key={key}
          className={modeStyle}
          onMouseOver={() => setHovered(i)}
          onClick={() => setMode(key as keyof typeof modes)}
        >
          {value.name}
          <div
            className={
              indicatorStyle +
              ` ${value.color} ${mode === key ? indicatorActiveStyle : ''}`
            }
          ></div>
        </div>
      ))}
    </Button>
  );
}
