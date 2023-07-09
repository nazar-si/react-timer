import { IconPlus } from '@tabler/icons-react';
import React, { useCallback, useEffect } from 'react';
import useTasksStore from '../../store/tasks';
import Task from './Task/Task';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function TaskList() {
  const [creating, setCreating] = React.useState(false);
  const [newTaskName, setNewTaskName] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const tasks = useTasksStore((s) => s.tasks);
  const addTask = useTasksStore((s) => s.addTask);

  const startCreating = () => {
    setCreating(true);
    setFocus(true);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [focus]);

  const stopCreating = () => {
    setFocus(false);
    setCreating(false);
    setNewTaskName('');
    if (newTaskName.trim() === '') return;
    addTask(newTaskName);
  };
  const stopCreatingOnKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setNewTaskName('');
      setCreating(false);
      setFocus(false);
      return;
    }
    if (e.key === 'Enter') {
      stopCreating();
    }
  };
  return (
    <div className="flex items-center flex-col w-full">
      <DndProvider backend={HTML5Backend}>
        {tasks.map((task, index) => (
          <Task task={task} key={task.id.toString()} index={index} />
        ))}
      </DndProvider>

      <input
        disabled={!creating}
        ref={inputRef}
        onKeyDown={stopCreatingOnKey}
        onChange={(e) => setNewTaskName(e.target.value)}
        onBlur={stopCreating}
        value={newTaskName}
        placeholder="New task name"
        type="text"
        className="w-full rounded-md my-2 py-1 px-2 outline-none bg-white border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 transition-all ring-0 ring-offset-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black disabled:-my-4 disabled:duration-0 disabled:opacity-0 disabled:py-0 disabled:text-transparent disabled:placeholder:text-transparent"
      />

      <button
        onClick={startCreating}
        className="w-full mb-10 mt-2 font-medium text-zinc-400 dark:text-zinc-500 flex justify-center items-center gap-2 hover:bg-gray-200 dark:hover:bg-zinc-800/50 rounded-md px-2 py-1"
      >
        Add task <IconPlus size={18} />
      </button>
    </div>
  );
}
