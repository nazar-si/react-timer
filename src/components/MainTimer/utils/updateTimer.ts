import { clearInterval } from 'worker-timers';
import React from 'react';
import { TFunction } from 'i18next';
import toClock from '../Display/toClock';
import plays from './audio';
import { ISettingsStore } from '@/features/settings/store/settings';

export type Context = {
  active: boolean;
  time: number;
  modeName: string;
  t: TFunction<'translation', undefined>;
  wakeLockRef: React.MutableRefObject<any>;
  intervalRef: React.MutableRefObject<number | null>;
  settings: ISettingsStore;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  eventRef: React.MutableRefObject<number | null>;
  stopEvent: (eventId: number) => void;
};
export function updateTimer(ctx: Context) {
  document.title =
    ctx.active && ctx.time > 0
      ? `${ctx.modeName} - ${toClock(ctx.time).join(':')}`
      : ctx.time <= 0
      ? `${ctx.modeName} - ${ctx.t('timer.overdue')}`
      : 'Pomodoro';
  if (!ctx.active) return;
  if (ctx.time == 0) {
    ctx.wakeLockRef.current.release();
    if (ctx.settings.playAlarm) plays['digital']();
    if (!ctx.settings.allowOverdue) {
      if (ctx.eventRef.current) {
        ctx.stopEvent(ctx.eventRef.current);
        ctx.eventRef.current = null;
      }
      ctx.setActive(false);
      ctx.setTime(0);
      clearInterval(ctx.intervalRef.current!);
    }
  }
}
