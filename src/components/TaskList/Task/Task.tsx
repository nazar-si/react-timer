import React, { useRef } from 'react';
import Button from '../../ui/Button/Button';
import useTasksStore, { Task } from '../../../store/tasks';
import { IconCheck, IconGripVertical, IconTrash } from '@tabler/icons-react';
import { classNames } from '../../../utls/classnames';

type Props = {
  task: Task;
};

const style = {
  wrapper:
    'grid grid-cols-[2rem_1fr_2rem] w-full gap-2 transition-all relative duration-200 ease-in-out',
  input:
    'flex-1 rounded-md py-1 px-2 outline-none bg-white border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 transition-all ring-0 ring-offset-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black',
  grip: 'absolute top-0 bottom-[2px] -left-6 text-gray-400 dark:text-zinc-500 flex justify-center items-center cursor-grab transition-all duration-200 opacity-0',
};

export default function Task({ task }: Props) {
  const setName = useTasksStore((s) => s.setName);
  const toggleTask = useTasksStore((s) => s.toggleTask);
  const removeTask = useTasksStore((s) => s.removeTask);
  const hideTask = useTasksStore((s) => s.hideTask);
  const [isUsed, setIsUsed] = React.useState(false);

  const elementRef = useRef<HTMLDivElement>(null);

  const deleteTask = (id: number) => {
    hideTask(id);
    setTimeout(() => {
      removeTask(id);
    }, 300);
  };

  return (
    <div
      key={task.id}
      ref={elementRef}
      className={classNames(style.wrapper, task.hide && 'opacity-0')}
      style={
        task.hide
          ? {
              marginTop: `-${elementRef.current!.clientHeight / 2 + 4}px`, // element height + half of the gap
              marginBottom: `-${elementRef.current!.clientHeight / 2 + 4}px`,
            }
          : {}
      }
      onFocus={() => setIsUsed(true)}
      onMouseOver={() => setIsUsed(true)}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.currentTarget.contains(document.activeElement)) return;
        setIsUsed(false);
      }}
      onBlur={(e: React.FocusEvent<HTMLDivElement, Element>) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsUsed(false);
      }}
    >
      <Button
        aria-label="mark as done"
        className={`w-8 h-8 !p-0 flex justify-center items-center ${
          task.done
            ? '!bg-blue-500 !border-blue-300  text-white hover:text-white/50'
            : 'text-transparent hover:text-gray-500'
        }`}
        onClick={() => toggleTask(task.id)}
      >
        <IconCheck size={18} />
      </Button>
      <input
        value={task.name}
        placeholder="Task name"
        onChange={(e) => setName(task.id, e.target.value)}
        type="text"
        className={classNames(
          task.done && 'text-gray-400 dark:text-gray-500',
          style.input,
        )}
      />
      <Button
        aria-label="delete task"
        onClick={() => deleteTask(task.id)}
        className="w-8 h-8 !p-0 flex justify-center items-center hover:!border-red-500 hover:text-red-600 dark:hover:text-red-400 !ring-red-500"
      >
        <IconTrash strokeWidth={1.5} size={18} />
      </Button>
      <div
        className={classNames(
          style.grip,
          isUsed && 'opacity-100',
          !isUsed && 'scale-50 -left-4',
        )}
      >
        <IconGripVertical size={20} />
      </div>
      {task.description && (
        <input
          type="text"
          role="description"
          placeholder="Description"
          className={classNames('col-span-3', style.input)}
        />
      )}
    </div>
  );
}
