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
      <div className='text-xl font-bold -mt-1'>Settings</div>
      <div className='text-lg font-medium mt-3 -mb-8'>Focus duration:</div>
      <ClockInput value={focusTime} setValue={setFocusTime}/>
      <div className='text-lg font-medium mt-3 -mb-8'>Break duration:</div>
      <ClockInput value={breakTime} setValue={setBreakTime}/>
      <div className='text-lg font-medium mt-3 -mb-8'>Long break duration:</div>
      <ClockInput value={longBreakTime} setValue={setLongBreakTime}/>
    </div>
  );
}
