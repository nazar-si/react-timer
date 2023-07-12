import React, { useState } from 'react';
import ClockInput from '../../ui/ClockInput/ClockInput';
import useTimerStore from '../../../store/timer/timer';
import { useTranslation } from 'react-i18next';

type Props = {};



export default function Settings({}: Props) {
  const [focusTime, setFocusTime] = useState(useTimerStore(s=>s.duration.focus));
  const [breakTime, setBreakTime] = useState(useTimerStore(s=>s.duration.break));
  const [longBreakTime, setLongBreakTime] = useState(useTimerStore(s=>s.duration.longBreak));
  const {t} = useTranslation();
  return (
    <div>
      <div className='text-xl font-bold -mt-1'>{t('settings.title')}</div>
      <div className='text-lg font-medium mt-3 -mb-8'>{t("settings.duration-focus")}</div>
      <ClockInput value={focusTime} setValue={setFocusTime}/>
      <div className='text-lg font-medium mt-3 -mb-8'>{t("settings.duration-break")}</div>
      <ClockInput value={breakTime} setValue={setBreakTime}/>
      <div className='text-lg font-medium mt-3 -mb-8'>{t("settings.duration-longBreak")}</div>
      <ClockInput value={longBreakTime} setValue={setLongBreakTime}/>
    </div>
  );
}
