import React, { useState } from 'react';
import ClockInput from '../../ui/ClockInput/ClockInput';
import useTimerStore from '../../../store/timer/timer';
import { useTranslation } from 'react-i18next';

type Props = {};

function H({children}:{children:React.ReactNode}) {
  return <h3 className='text-lg font-medium mt-3 -mb-8'>
    {children}
  </h3>
}


export default function Settings({}: Props) {
  const focusTime = useTimerStore(s=>s.duration.focus);
  const breakTime = useTimerStore(s=>s.duration.break);
  const longBreakTime = useTimerStore(s=>s.duration.longBreak);
  const setDuration = useTimerStore(s=>s.setDuration);
  const {t} = useTranslation();

  return (
    <div>
      <div className='text-xl font-bold -mt-1'>{t('settings.title')}</div>
      <H>{t("settings.duration-focus")}</H>
      <ClockInput value={focusTime} setValue={(a)=>setDuration("focus", a)}/>
      <H>{t("settings.duration-break")}</H>
      <ClockInput value={breakTime} setValue={(a)=>setDuration("break", a)}/>
      <H>{t("settings.duration-longBreak")}</H>
      <ClockInput value={longBreakTime} setValue={(a)=>setDuration("longBreak", a)}/>
    </div>
  );
}
