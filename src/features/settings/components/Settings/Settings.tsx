import React from 'react';
import ClockInput from '../ClockInput/ClockInput';
import useTimerStore from '@/store/timer/timer';
import { useTranslation } from 'react-i18next';
import Divider from '@/components/ui/Divider/Divider';
import Switch, { Props as SwitchProps } from '@/components/ui/Switch/Switch';
import useSettingsStore from '../../store/settings';
import { IconHelpSquareRounded } from '@tabler/icons-react';

type HProps = { children: React.ReactNode };
function H({ children }: HProps) {
  return (
    <h3 className="text-sm font-bold mt-4 -mb-6 w-full text-center">
      {children}
    </h3>
  );
}

function LabeledSwitch(
  props: SwitchProps & { children?: React.ReactNode; hint?: string },
) {
  return (
    <div className="flex items-center my-2 text-zinc-700 dark:text-zinc-300">
      {props.hint && (
        <div className="relative text-gray-400 dark:text-zinc-500 hover:!text-blue-500 transition-all group/popup mr-2">
          <IconHelpSquareRounded />
          <div className="absolute opacity-0 w-max max-w-xs z-20 bottom-8 transition-all left-0 rounded-md px-2 py-1 bg-white dark:bg-zinc-800/50 border border-zinc-300 dark:border-white/10 text-black dark:text-white group-hover/popup:opacity-100 pointer-events-none">
            {props.hint}
          </div>
        </div>
      )}
      <div className="flex-1">{props.children}</div>
      <Switch {...props} />
    </div>
  );
}

export default function Settings() {
  const focusTime = useTimerStore((s) => s.duration.focus);
  const breakTime = useTimerStore((s) => s.duration.break);
  const longBreakTime = useTimerStore((s) => s.duration.longBreak);
  const setDuration = useTimerStore((s) => s.setDuration);
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-xl font-bold -mt-1">{t('settings.title')}</div>
      <H>{t('settings.duration-focus')}</H>
      <ClockInput
        value={focusTime}
        setValue={(a: number) => setDuration('focus', a)}
      />
      <H>{t('settings.duration-break')}</H>
      <ClockInput
        value={breakTime}
        setValue={(a: number) => setDuration('break', a)}
      />
      <H>{t('settings.duration-longBreak')}</H>
      <ClockInput
        value={longBreakTime}
        setValue={(a: number) => setDuration('longBreak', a)}
      />
      <br />
      <Divider>{t('settings.other.title')}</Divider>

      <LabeledSwitch
        value={useSettingsStore((s) => s.allowOverdue)}
        onChange={useSettingsStore((s) => s.setAllowOverdue)}
        hint={t('settings.other.allowOverdueHint')}
      >
        {t('settings.other.allowOverdue')}
      </LabeledSwitch>
      <LabeledSwitch
        value={useSettingsStore((s) => s.playAlarm)}
        onChange={useSettingsStore((s) => s.setPlayAlarm)}
      >
        {t('settings.other.playAlarm')}
      </LabeledSwitch>
      <LabeledSwitch
        disabled={useSettingsStore((s) => !s.playAlarm)}
        value={useSettingsStore((s) => s.playAlarmOnBreakOnly)}
        onChange={useSettingsStore((s) => s.setPlayAlarmOnBreakOnly)}
      >
        {t('settings.other.playAlarmOnBreak')}
      </LabeledSwitch>
      <LabeledSwitch
        value={useSettingsStore((s) => s.hideTitle)}
        onChange={useSettingsStore((s) => s.setHideTitle)}
      >
        {t('settings.other.hideTitle')}
      </LabeledSwitch>
    </div>
  );
}
