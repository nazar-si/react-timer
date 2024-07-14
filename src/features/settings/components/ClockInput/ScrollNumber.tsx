import { classNames } from '@/utls/classnames';
import { FC, useEffect, useRef, useState } from 'react';

type Props = {
  value: number;
  setValue: (value: number) => void;
  max: number;
  direction: 'left' | 'right';
};

const ITEM_HEIGHT = 20;
const TOP_GAP = 4;

export const ScrollNumber: FC<Props> = ({
  value,
  setValue,
  max,
  direction,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentScroll, setCurrentScroll] = useState(value);
  useEffect(() => {
    if (!scrollRef.current) return;
    const to = value * ITEM_HEIGHT + TOP_GAP;
    if (Math.abs(scrollRef.current.scrollTop - to) > ITEM_HEIGHT / 2) {
      scrollRef.current.scrollTo({
        top: to,
        behavior: 'smooth',
      });
    }
  }, [value]);

  return (
    <div
      ref={scrollRef}
      className={classNames(
        'w-32 h-16 -my-4 z-10 overflow-y flex flex-col py-6 items-center snap-y snap-mandatory no-scrollbar smooth-scroll',
        direction === 'left' && 'pl-16',
        direction === 'right' && 'pr-16',
      )}
      onScroll={(e) => {
        const currentScroll = (e.target as HTMLElement).scrollTop - TOP_GAP;
        const newValue = Math.min(
          Math.max(0, Math.round(currentScroll / ITEM_HEIGHT)),
          max - 1,
        );
        setCurrentScroll(newValue);
        setValue(newValue);
      }}
    >
      {Array(max)
        .fill(0)
        .map((_, i) => {
          return (
            <div
              key={i}
              className={classNames(
                'snap-center text-2xl font-mono font-semibold h-5 flex items-center justify-center transition-all',
                currentScroll === i ? '' : 'opacity-25',
                currentScroll !== i && 'scale-75',
              )}
            >
              {i}
            </div>
          );
        })}
    </div>
  );
};
