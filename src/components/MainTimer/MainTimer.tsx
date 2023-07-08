import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button/Button';
import ThemeSwitch from '../ui/ThemeSwitch/ThemeSwitch';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import useTimerStore from '../../store/timer/timer';
import TaskList from '../TaskList/TaskList';
import useTasksStore from '../../store/tasks';
import { REFRESH_DELAY } from './refresh';
import { addTime, diff } from './moment';
import Display from './Display/Display';
import Title from './Title/Title';
import toClock from './Display/toClock';
import plays from './audio';

const addMoreTime = [
  { time: 20, label: '+ 20 sec' },
  { time: 60, label: '+ 1 min' },
  { time: 300, label: '+ 5 min' },
];

export default function MainTimer() {
  const maxTime = useTimerStore((state) => state.duration[state.mode]);
  const mode = useTimerStore((state) => state.mode);
  const modeName = { work: 'Focus!', break: 'Break', longBreak: 'Long Break' }[
    mode
  ];

  const [finishDate, setFinishDate] = useState(new Date());
  const [realMaxTime, setRealMaxTime] = useState(maxTime);
  const [time, setTime] = useState(maxTime);
  const [active, setActive] = useState(false);

  // interval used to update UI
  const intervalRef = useRef<number | null | NodeJS.Timer>(null);
  const wakeLockRef = useRef<any>(null);
  const anyTasks = useTasksStore((state) => state.tasks.length > 0);

  useEffect(() => {
    Reset();
  }, [mode]);

  useEffect(() => {
    clearInterval(intervalRef.current!);
    const getWakeLock = async () => {
      return await navigator.wakeLock?.request();
    };
    if (wakeLockRef.current) wakeLockRef.current.release();
    if (active) {
      getWakeLock().then((r) => (wakeLockRef.current = r));
      intervalRef.current = setInterval(() => {
        setTime(diff(finishDate, new Date()));
      }, REFRESH_DELAY);
    }
  }, [active, finishDate]);

  useEffect(() => {
    document.title = active
      ? `${modeName} - ${toClock(time).join(':')}`
      : time === 0
      ? `${modeName} - time is up!`
      : 'Pomodoro';
    if (!active) return;
    if (time <= 0) {
      wakeLockRef.current.release();
      plays['digital']();
      setActive(false);
      setTime(0);
      clearInterval(intervalRef.current!);
    }
  }, [time, active]);

  const Reset = () => {
    setRealMaxTime(maxTime);
    setFinishDate(addTime(new Date(), maxTime));
    setTime(maxTime);
    setActive(false);
    wakeLockRef.current?.release();
    clearInterval(intervalRef.current!);
  };

  return (
    <div
      className="flex flex-col gap-4 transition-all duration-500"
      style={{
        transform: `translateY(calc(${anyTasks ? '100px' : '50vh - 50%'}))`,
      }}
    >
      <Title content="Pomodoro" />
      <ModeSwitch />
      <Display active={active} time={time} realMaxTime={realMaxTime} />
      <div className="flex gap-4">
        <Button
          className="flex-1"
          onClick={() => {
            if (time <= 0) {
              Reset();
              return;
            }
            setActive((active) => !active);
            if (!active) {
              setFinishDate(addTime(new Date(), time));
            }
          }}
        >
          {active ? 'Stop' : time <= 0 ? 'Repeat' : 'Start'}
        </Button>
        <Button className="flex-1" onClick={() => Reset()}>
          Reset
        </Button>
        <ThemeSwitch updateClass />
      </div>
      <div className="flex gap-4">
        {addMoreTime.map((a) => (
          <Button
            key={a.label}
            className="flex-1"
            onClick={() => {
              setRealMaxTime((maxTime) => maxTime + a.time);
              setFinishDate((maxTime) => addTime(maxTime, a.time));
              setTime((time) => time + a.time);
            }}
          >
            {a.label}
          </Button>
        ))}
      </div>
      <TaskList />
    </div>
  );
}
