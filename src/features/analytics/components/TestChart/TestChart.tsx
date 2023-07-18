import { AreaChart, Title } from '@tremor/react';
import React, { useEffect, useState } from 'react';
import useAnalyticsStore, { Statistics } from '../../store/analytics';
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

const dataFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + ' min';
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
  return (
    <>
      <Title>Total time estimates</Title>
      <AreaChart
        className="h-72 mt-4"
        data={state}
        index="date"
        categories={['focus', 'break', 'longBreak']}
        colors={['cyan', 'green', 'purple']}
        valueFormatter={dataFormatter}
      />

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
