import { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import useTimerStore from '../../store/timer';
import TaskList from '../TaskList/TaskList';
import useTasksStore from '../../store/tasks';
import { REFRESH_DELAY, REFRESH_RATE } from './refresh';
import { addTime, diff } from './moment';
import Display from './Display/Display';

function leftpad(num : number) {
  const str = num.toString();
  return str.length < 2 ? "0" + str : str;
}

export default function MainTimer() {
  const maxTime = useTimerStore(state => state.duration[state.mode]);
  const mode = useTimerStore(state => state.mode);
  
  const [finishDate, setFinishDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [realMaxTime, setRealMaxTime] = useState(maxTime);
  const [time, setTime] = useState(maxTime);
  const [active, setActive] = useState(false);

  // interval used to update UI
  const intervalRef = useRef<number | null | NodeJS.Timer>(null);
  const anyTasks = useTasksStore(state => state.tasks.length > 0);

  useEffect(() => {
    Reset();
    setTime(maxTime);
  }, [mode]);

  useEffect(() => {
    clearInterval(intervalRef.current!);
    if (active) {
      intervalRef.current = setInterval(()=>{
        setTime(diff(finishDate, new Date()));
      }, REFRESH_DELAY);
    }
  }, [active, finishDate]);

  useEffect(() => {
    document.title = `Pomodoro ${leftpad(Math.floor(time / 60))}:${leftpad(time % 60)}`
    if (!active) return;
    if (time <= 0) {
      setActive(false);
      setTime(0);
      clearInterval(intervalRef.current!);
    }
  }, [time, active]);

  const Reset = () => {
    setRealMaxTime(maxTime);
    setFinishDate(addTime(new Date(), maxTime));
    setStartDate(new Date());
    setTime(maxTime);
    setActive(false);
    clearInterval(intervalRef.current!);
  }

  return (
    <div className="flex flex-col gap-4 transition-all duration-500" style={{transform: `translateY(calc(${anyTasks?"100px":"50vh - 50%"}))`}}>
      <div className="flex justify-center w-80 sm:w-96">
        <h1 className="text-7xl sm:text-8xl md:text-9xl -mt-20 mb-10 font-bold text-gray-200 dark:text-black/50">Pomodoro</h1>
      </div>
      <ModeSwitch/>
      <Display active={active} time={time} realMaxTime={realMaxTime}/>
      <div className="flex gap-4">
        <Button aria-label={active?"stop":"start"} className='flex-1' onClick={()=>{
          if (time <= 0) {
            Reset();
            setActive(true);
            setTime(t=>t+0.5);
            return;
          }
          setActive(active=>!active);
          if (!active) {
            setStartDate(new Date());
            setFinishDate(addTime(new Date(), realMaxTime));
          }
        }}>
          {active?"Stop":"Start"}
        </Button>
        <Button aria-label='reset' className='flex-1' onClick={()=>Reset()}>
          Reset
        </Button>
        <ThemeSwitch updateClass/>
      </div>
      <div className="flex gap-4">
        {
          [
            {time:20, label: "+ 20 sec"}, 
            {time:60, label: "+ 1 min"}, 
            {time:300, label: "+ 5 min"}].map(a=>
            <Button aria-label={a.label} key={a.label} className="flex-1" onClick={()=>{
              setRealMaxTime(maxTime=>maxTime + a.time);
              setFinishDate(maxTime=>addTime(maxTime, a.time));
              setTime(time=>time + a.time);
            }}>
              {a.label}
            </Button>)
        }
      </div>
      <TaskList/>
    </div>
  )
}