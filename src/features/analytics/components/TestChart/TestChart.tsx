import { AreaChart, Title } from '@tremor/react';
import React, { useEffect, useState } from 'react';
import useAnalyticsStore, { Statistics, modeType } from '../../store/analytics';
import Button from '@/components/ui/Button/Button';
import MapJSON from '@/utls/mapJSON';

const chartdata = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
  },
];

const Formatter = (n: number) => {
  const mins = n % 60;
  const hours = Math.floor(n / 60);
  const hoursFrac = Math.floor(mins / 6) / 10;
  if (hours === 0) return `${mins} min`;
  if (hours <= 5) return `${hours} h ${mins} min`;
  return `${Math.round(hours + hoursFrac)} h`;
};

export default function TestChart() {
  const events = useAnalyticsStore((s) => s.events);
  const [state, setState] = useState<Statistics>([]);
  const [day, setDay] = useState(new Date());
  const actions = useAnalyticsStore((s) => ({
    dispatchEvent: s.dispatchEvent,
    addTimeToEvent: s.addTimeToEvent,
    stopEvent: s.stopEvent,
    getStatistics: s.getStatistics,
  }));
  useEffect(() => {
    setState(actions.getStatistics());
  }, [events]);

  const names: Record<modeType, string> = {
    focus: 'Focus',
    break: 'Break',
    longBreak: 'Long Break',
  };

  return (
    <>
      <Title>Total time estimates</Title>
      <AreaChart
        stack={true}
        curveType="natural"
        className="h-72 mt-4"
        data={state.map((a) => ({
          [names.focus]: a.focus,
          [names.break]: a.break,
          [names.longBreak]: a.longBreak,
          date: a.date,
        }))}
        index="date"
        categories={Object.values(names)}
        colors={['cyan', 'green', 'purple']}
        valueFormatter={Formatter}
      />
      <div className="grid grid-rows-[repeat(7,1fr)] grid-flow-col w-fit gap-1  ">
        {state.map((s, i) => (
          <div
            className={`w-3 h-3 rounded-sm border border-blue-300/25`}
            style={{ background: `#38f${Math.floor(s.focus / 100)}` }}
          ></div>
        ))}
        {Array(220 - state.length)
          .fill(0)
          .map((_, i) => (
            <div
              className={`w-3 h-3 rounded-sm border border-zinc-700 bg-[#333]`}
            ></div>
          ))}
      </div>
      <br />
      <Button
        className="mr-4"
        onClick={() => {
          let id = 0;
          for (let i = 0; i < 4; i++) {
            id = actions.dispatchEvent('focus', day);
            console.log(id);
            actions.addTimeToEvent(id, 20 + Math.round(Math.random() * 10));
            actions.stopEvent(id);
            id = actions.dispatchEvent('break', day);
            console.log(id);
            actions.addTimeToEvent(id, 5 + Math.round(Math.random() * 2));
            actions.stopEvent(id);
          }
          id = actions.dispatchEvent('longBreak', day);
          console.log(id);
          actions.addTimeToEvent(id, 15 + Math.round(Math.random() * 10));
          actions.stopEvent(id);
        }}
      >
        DEBUG: Add random circle
      </Button>
      <Button
        onClick={() => {
          const nextDay = day;
          nextDay.setDate(day.getDate() + 1);
          setDay(nextDay);
        }}
      >
        DEBUG: Add day
      </Button>
    </>
  );
}
