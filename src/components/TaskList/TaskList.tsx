import { IconCheck, IconPlus, IconTrash } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import useTasksStore from '../../store/tasks';
import Button from '../Button/Button';
import { Transition } from '@headlessui/react';


export default function TaskList() {
  const [creating, setCreating] = React.useState(false);
  const [newTaskName, setNewTaskName] = React.useState('');
  const [focus, setFocus] = React.useState(false); 
  const inputRef = React.useRef<HTMLInputElement>(null);
  const tasks = useTasksStore(s=>s.tasks);
  const addTask = useTasksStore(s=>s.addTask);
  const removeTask = useTasksStore(s=>s.removeTask);
  const hideTask = useTasksStore(s=>s.hideTask);
  const setName = useTasksStore(s=>s.setName);
  const toggleTask = useTasksStore(s=>s.toggleTask);

  const startCreating = () => {
    setCreating(true);
    setFocus(true)
  }
  useEffect(() => {
    inputRef.current?.focus();
  }, [focus])

  const deleteTask = (id: number) => {
    hideTask(id);
    setTimeout(() => {
      removeTask(id);
    }, 300);
  }
  

  const stopCreating = () => {
    setFocus(false);
    setCreating(false);
    setNewTaskName('');
    if (newTaskName.trim() === '') return;
    addTask(newTaskName);
  }
  const stopCreatingOnKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      stopCreating();
    }
  }
  return (
    <div className="flex items-center flex-col gap-2 w-full">

        {tasks.map(task => <div key={task.id} className={"flex w-full gap-2 transition-all " + (task.hide?"-my-5 opacity-0":"")}>
            <Button 
              className={`w-8 h-8 !p-0 flex justify-center items-center ${task.done?"text-inherit hover:text-blue-500":"text-transparent hover:text-gray-500"}`} 
              onClick={()=>toggleTask(task.id)}>
              <IconCheck size={18}/>
            </Button>
            <input 
              value={task.name} 
              placeholder='Task name' 
              onChange={e=>setName(task.id, e.target.value)}
              type="text" 
              className={`${task.done?"text-gray-500 dark:text-gray-400":""} flex-1 rounded-md py-1 px-2 outline-none bg-white border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 transition-all ring-0 ring-offset-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black`} />
            <Button onClick={()=>deleteTask(task.id)} className="w-8 h-8 !p-0 flex justify-center items-center hover:!border-red-500 hover:text-red-600 dark:hover:text-red-400 !ring-red-500">
              <IconTrash strokeWidth={1.5} size={18}/>
            </Button>
          </div>)}
        
        <input disabled={!creating} ref={inputRef} onKeyDown={stopCreatingOnKey} onChange={e=>setNewTaskName(e.target.value)} onBlur={stopCreating} value={newTaskName} placeholder='New task name' type="text" className='w-full rounded-md py-1 px-2 outline-none bg-white border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 transition-all ring-0 ring-offset-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black disabled:-my-4 disabled:duration-0 disabled:opacity-0 disabled:py-0 disabled:text-transparent disabled:placeholder:text-transparent' />

        <button onClick={startCreating} className="w-full mb-10 font-medium text-zinc-400 dark:text-zinc-500 flex justify-center items-center gap-2 hover:bg-gray-200 dark:hover:bg-zinc-800/50 rounded-md px-2 py-1">Add task <IconPlus size={18}/></button>
    </div>
  )
}