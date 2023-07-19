import { AreaChart, Title } from '@tremor/react';
import React, { useEffect, useState } from 'react';
import useAnalyticsStore, { Statistics, modeType } from '../../store/analytics';
import Button from '@/components/ui/Button/Button';

const valueFormatter = (n: number) => {
  const mins = n % 60;
  const hours = Math.floor(n / 60);
  if (hours === 0) return `${mins} min`;
  if (mins) return `${hours} h ${mins} min`;
  return `${hours} h`;
};
const DateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
});

export default function TestChart() {
  const events = useAnalyticsStore((s) => s.events);
  const [state, setState] = useState<Statistics>([]);
  const [day, setDay] = useState(new Date());
  const actions = useAnalyticsStore((s) => s.actions());
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
        stack={false}
        curveType="natural"
        className="h-72 mt-4"
        data={state.map((a) => ({
          [names.focus]: a.focus,
          [names.break]: a.break,
          [names.longBreak]: a.longBreak,
          date: DateFormatter.format(a.date),
        }))}
        index="date"
        categories={Object.values(names)}
        colors={['cyan', 'green', 'purple']}
        valueFormatter={valueFormatter}
      />
      <br />
      <Button
        className="mr-4"
        onClick={() => {
          let id = 0;
          for (let i = 0; i < 4; i++) {
            id = actions.dispatchEvent('focus', day);
            actions.addTimeToEvent(id, 20 + Math.round(Math.random() * 10));
            actions.stopEvent(id);
            id = actions.dispatchEvent('break', day);
            actions.addTimeToEvent(id, 5 + Math.round(Math.random() * 2));
            actions.stopEvent(id);
          }
          id = actions.dispatchEvent('longBreak', day);
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
