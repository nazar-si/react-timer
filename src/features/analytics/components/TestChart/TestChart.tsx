import {
  AreaChart,
  DonutChart,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Title,
} from '@tremor/react';
import React, { useEffect, useState } from 'react';
import useAnalyticsStore, { Statistics, modeType } from '../../store/analytics';
import Button from '@/components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { IconChartAreaLine, IconChartDonut } from '@tabler/icons-react';

export default function TestChart() {
  const events = useAnalyticsStore((s) => s.events);
  const { t, i18n } = useTranslation();
  const [state, setState] = useState<Statistics>([]);
  const [day, setDay] = useState(new Date());
  const actions = useAnalyticsStore((s) => s.actions());
  useEffect(() => {
    setState(actions.getStatistics());
  }, [events]);
  const DateFormatter = new Intl.DateTimeFormat(i18n.language, {
    day: 'numeric',
    month: 'short',
  });
  const valueFormatter = (n: number) => {
    const nbsp = '\u00A0';
    const mins = Math.floor(n) % 60;
    const hours = Math.floor(n / 60);
    const sec = Math.floor(n * 60);
    if (n < 1) return `${sec}${nbsp}${t('timer.sec')[0]}`;
    if (hours === 0) return `${mins}${nbsp}${t('timer.min')}`;
    if (mins)
      return `${hours}${nbsp}${t('timer.hours')}${nbsp}${mins}${nbsp}${
        t('timer.min')[0]
      }`;
    return `${hours}${nbsp}${t('timer.hours')}`;
  };

  const names: Record<modeType, string> = {
    focus: t('focus'),
    break: t('break'),
    longBreak: t('longBreak'),
  };

  return (
    <>
      <Title>
        {t('analytics.title')}{' '}
        <span className="opacity-50">({t('experimental')})</span>
      </Title>
      <TabGroup>
        <TabList>
          <Tab icon={IconChartAreaLine}>{t('analytics.time-plot')}</Tab>
          <Tab icon={IconChartDonut}>{t('analytics.total-time')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AreaChart
              stack={false}
              curveType="monotone"
              showAnimation={false}
              className="h-72 mt-4"
              data={state.map((a) => ({
                [names.focus]: a.focus,
                [names.break]: a.break,
                [names.longBreak]: a.longBreak,
                date: DateFormatter.format(a.date),
              }))}
              noDataText={t('analytics.no-data')}
              index="date"
              categories={Object.values(names)}
              colors={['blue', 'green', 'purple']}
              valueFormatter={valueFormatter}
            />
          </TabPanel>
          <TabPanel>
            <DonutChart
              noDataText={t('analytics.no-data')}
              showAnimation={false}
              data={Object.entries(
                state.reduce(
                  (a, b) => ({
                    date: b.date,
                    focus: a.focus + b.focus,
                    break: a.break + b.break,
                    longBreak: a.longBreak + b.longBreak,
                  }),
                  { date: new Date(), focus: 0, break: 0, longBreak: 0 },
                ),
              )
                .filter((a) => a[0] != 'date')
                .map((a) => ({
                  name: t(a[0]),
                  time: a[1],
                }))}
              category="time"
              valueFormatter={valueFormatter}
              colors={['blue', 'green', 'purple']}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <br />
      {!import.meta.env.PROD && (
        <>
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
      )}
    </>
  );
}
