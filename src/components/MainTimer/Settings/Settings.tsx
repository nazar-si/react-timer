import React, { useState } from 'react';
import Select from '../../ui/Select/Select';
import ClockInput from '../../ui/ClockInput/ClockInput';
import Button from '../../ui/Button/Button';
import useTimerStore from '../../../store/timer/timer';

type Props = {};



export default function Settings({}: Props) {
  const [focusTime, setFocusTime] = useState(useTimerStore(s=>s.duration.focus));
  const [breakTime, setBreakTime] = useState(useTimerStore(s=>s.duration.break));
  const [longBreakTime, setLongBreakTime] = useState(useTimerStore(s=>s.duration.longBreak));
  return (
    <div>
      <ClockInput value={focusTime} setValue={setFocusTime}/>
      <ClockInput value={breakTime} setValue={setBreakTime}/>
      <ClockInput value={longBreakTime} setValue={setLongBreakTime}/>
    </div>
  );
}
