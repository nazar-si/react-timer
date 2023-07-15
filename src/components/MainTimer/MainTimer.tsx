import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@ui/Button/Button';
import ThemeSwitch from '@ui/ThemeSwitch/ThemeSwitch';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import Display from './Display/Display';
import Title from './Title/Title';
import Analytics from '@/features/analytics/components/Analytics';
import TaskList from '@/features/tasks/components/TaskList/TaskList';
import { IconChartAreaLine } from '@tabler/icons-react';

import useTimerStore from '@/store/timer/timer';
import useTasksStore from '../../features/tasks/store/tasks';
import useSetttingsStore from '@/features/settings/store/settings';

import { REFRESH_DELAY } from './refresh';
import { addTime, diff } from './moment';
import toClock from './Display/toClock';
import plays from './audio';

const addMoreTime = [
  { time: 20, label: '+ 20', measure: 'sec' },
  { time: 60, label: '+ 1', measure: 'min' },
  { time: 300, label: '+ 5', measure: 'min' },
];

export default function MainTimer() {
  const { t } = useTranslation();

  const maxTime = useTimerStore((state) => state.duration[state.mode]);
  const mode = useTimerStore((state) => state.mode);
  const anyTasks = useTasksStore((state) => state.tasks.length > 0);
  const settings = useSetttingsStore((s) => s);

  const [showAnalytics, setShowAnalytics] = React.useState(false);
  const modeName = t(mode);

  const [finishDate, setFinishDate] = React.useState(new Date());
  const [realMaxTime, setRealMaxTime] = React.useState(maxTime);
  const [time, setTime] = React.useState(maxTime);
  const [active, setActive] = React.useState(false);

  // interval used to update UI
  const intervalRef = React.useRef<number | null | NodeJS.Timer>(null);
  const wakeLockRef = React.useRef<any>(null);

  React.useEffect(() => {
    Reset();
  }, [mode, maxTime]);

  React.useEffect(() => {
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

  React.useEffect(() => {
    document.title =
      active && time > 0
        ? `${modeName} - ${toClock(time).join(':')}`
        : time <= 0
        ? `${modeName} - ${t('timer.overdue')}`
        : 'Pomodoro';
    if (!active) return;
    if (time == 0) {
      wakeLockRef.current.release();
      if (settings.playAlarm) plays['digital']();
      if (!settings.allowOverdue) {
        setActive(false);
        setTime(0);
        clearInterval(intervalRef.current!);
      }
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
        transform: `translateY(calc(${anyTasks ? '32px' : '50vh - 50%'}))`,
      }}
    >
      <Title content="Pomodoro" />
      <ModeSwitch />
      <Display
        active={active && time > 0}
        time={time}
        realMaxTime={realMaxTime}
      />
      <div className="flex gap-4">
        <Button className="w-10 h-10" onClick={() => setShowAnalytics(true)}>
          <IconChartAreaLine strokeWidth={1.5} />
        </Button>
        <Analytics show={showAnalytics} setShow={setShowAnalytics} />
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
          {active
            ? t('timer.stop')
            : time <= 0
            ? t('timer.repeat')
            : t('timer.start')}
        </Button>
        <Button className="flex-1" onClick={() => Reset()}>
          {t('timer.reset')}
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
            {a.label} {t(`timer.${a.measure}`)}
          </Button>
        ))}
      </div>
      <TaskList />
    </div>
  );
}
