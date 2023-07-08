import { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import useTimerStore from '../../store/timer';
import TaskList from '../TaskList/TaskList';
import useTasksStore from '../../store/tasks';
import { REFRESH_DELAY, REFRESH_RATE } from './refresh';
import { addTime, diff } from './moment';

function leftpad(num : number) {
  const str = num.toString();
  return str.length < 2 ? "0" + str : str;
}
const clockStile = "text-7xl sm:text-8xl font-bold text-center text-gray-700 dark:text-zinc-200 transition-all font-mono px-4";
const clockOut = " !text-red-500 dark:!text-red-300";
const shadowOut = " !shadow-[0_0_30px_#f898] !border-red-500";

const modes = {
  work: {
    color: "#04f",
    border: "!border-blue-500",
    neon: "!shadow-[0_0_30px_#4af8]",
    text: "!text-blue-500 dark:!text-blue-200",
  },
  break: {
    color: "#0cf",
    border: "!border-teal-500",
    neon: "!shadow-[0_0_30px_#4fc8]",
    text: "!text-teal-500 dark:!text-teal-200",
  },
  longBreak: {
    color: "#40f",
    border: "!border-purple-500",
    neon: "!shadow-[0_0_30px_#a4f8]",
    text: "!text-indigo-500 dark:!text-indigo-200",
  }
}

export default function MainTimer() {
  const maxTime = useTimerStore(state => state.duration[state.mode]);
  const mode = useTimerStore(state => state.mode);
  const shadowActive = ` ${modes[mode].neon} ${modes[mode].border}`;
  const clockActive = ` ${modes[mode].text}`;
  
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
      <div className='p-[3px] rounded-[1.1rem] relative' style={{
        background: `conic-gradient(${time===0?"#f040":modes[mode].color}, ${time===0?"#f040":modes[mode].color} ${100 - time / realMaxTime * 100}%, #0000 ${102 - time / realMaxTime * 102}%, #0000)`
      }}>
        <div className="absolute w-full h-full top-0 left-0 rounded-2xl blur-3xl -z-10"
          style={{
            background: `conic-gradient(${time===0?"#f040":modes[mode].color}, ${time===0?"#f040":modes[mode].color} ${100 - time / realMaxTime * 100}%, #0000 ${102 - time / realMaxTime * 102}%, #0000)`
          }}
        >
        </div>
        <div className="absolute w-full h-full top-0 left-0 rounded-2xl blur-3xl -z-10 bg-red-500 opacity-0 duration-500 transition-all" style={{opacity: time===0?"1":"0"}}
        >
        </div>
        <main className={`shadow-[0_0_10px_#0003,0_0_0_#0000] p-4 rounded-2xl bg-white border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 transition-all duration-300 border ${active?shadowActive:time===0?shadowOut:""}`}>
          <div className={clockStile + (active?clockActive:time===0?clockOut:"")}>
            {leftpad(Math.floor(time / 60))}<span className="opacity-50">:</span>{leftpad(Math.floor(time % 60))}
          </div>
        </main>

      </div>
      <div className="flex gap-4">
        <Button className='flex-1' onClick={()=>{
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
        <Button className='flex-1' onClick={()=>Reset()}>
          Reset
        </Button>
        <ThemeSwitch updateClass/>
      </div>
      <div className="flex gap-4">
        {
          [
            {time:20.5, label: "+ 20 sec"}, 
            {time:60.5, label: "+ 1 min"}, 
            {time:300.5, label: "+ 5 min"}].map(a=>
            <Button key={a.label} className="flex-1" onClick={()=>{
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