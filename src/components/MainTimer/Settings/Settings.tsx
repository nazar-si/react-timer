import React from 'react';
import Select from '../../ui/Select/Select';

type Props = {};

const times = [
  { name: '5 minutes', value: 5 * 60 },
  { name: '10 minutes', value: 10 * 60 },
  { name: '15 minutes', value: 15 * 60 },
  { name: '20 minutes', value: 20 * 60 },
  { name: '25 minutes', value: 25 * 60 },
  { name: '30 minutes', value: 30 * 60 },
  { name: '35 minutes', value: 35 * 60 },
  { name: '40 minutes', value: 40 * 60 },
  { name: '45 minutes', value: 45 * 60 },
  { name: '50 minutes', value: 50 * 60 },
  { name: '55 minutes', value: 55 * 60 },
];

export default function Settings({}: Props) {
  const [focusTime, setFocusTime] = React.useState('25 minutes');
  const [breakTime, setBreakTime] = React.useState('5 minutes');
  const [longBreakTime, setLongBreakTime] = React.useState('15 minutes');
  const handleFocusTimeChange = (time: string) => {
    setFocusTime(time);
  }
  const handleBreakTimeChange = (time: string) => {
    setBreakTime(time);
  }
  const handleLongBreakTimeChange = (time: string) => {
    setLongBreakTime(time);
  }
  return (
    <div>
      <div className="flex gap-2 items-center w-full">
        Focus Duration:
        <Select.Root className="flex-1" value={focusTime} onChange={handleFocusTimeChange}>
          <Select.Button>{focusTime}</Select.Button>
          <Select.Options>
            {times.map((time) => (
              <Select.Option key={time.name} value={time.name}>
                {({ selected }) => (
                  <div className={selected ? 'text-blue-500' : 'text-current'}>
                    {time.name}
                  </div>
                )}
              </Select.Option>
            ))}
          </Select.Options>
        </Select.Root>
      </div>
      <div className="flex gap-2 items-center w-full">
        Break Duration:
        <Select.Root className="flex-1" value={breakTime} onChange={handleBreakTimeChange}>
          <Select.Button>{breakTime}</Select.Button>
          <Select.Options>
            {times.map((time) => (
              <Select.Option key={time.name} value={time.name}>
                {({ selected }) => (
                  <div className={selected ? 'text-blue-500' : 'text-current'}>
                    {time.name}
                  </div>
                )}
              </Select.Option>
            ))}
          </Select.Options>
        </Select.Root>
      </div>
      <div className="flex gap-2 items-center w-full">
        Long Break Duration:
        <Select.Root className="flex-1" value={longBreakTime} onChange={handleLongBreakTimeChange}>
          <Select.Button>{longBreakTime}</Select.Button>
          <Select.Options>
            {times.map((time) => (
              <Select.Option key={time.name} value={time.name}>
                {({ selected }) => (
                  <div className={selected ? 'text-blue-500' : 'text-current'}>
                    {time.name}
                  </div>
                )}
              </Select.Option>
            ))}
          </Select.Options>
        </Select.Root>
      </div>
    </div>
  );
}
