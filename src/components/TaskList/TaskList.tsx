import { IconPlus, IconTrash } from '@tabler/icons-react';
import React, { useCallback, useEffect } from 'react';
import useTasksStore from '../../store/tasks';
import Task from './Task/Task';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button/Button';

export default function TaskList() {
  const [creating, setCreating] = React.useState(false);
  const [newTaskName, setNewTaskName] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const tasks = useTasksStore((s) => s.tasks);
  const addTask = useTasksStore((s) => s.addTask);
  const moveTask = useTasksStore((s) => s.moveTask);
  const removeTask = useTasksStore((s) => s.removeTask);

  const { t } = useTranslation();

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
  const onDragEnd = (event: DragEndEvent) => {
    const idx = tasks.map((t) => t.id);
    const activeIndex = idx.indexOf(event.active.id as number);
    const overIndex = idx.indexOf(event.over?.id as number);

    if (activeIndex === overIndex) return;
    moveTask(activeIndex, overIndex);
  };

  return (
    <div className="w-full">
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task, index) => (
            <Task task={task} key={task.id.toString()} index={index} />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex flex-col">
        <input
          disabled={!creating}
          ref={inputRef}
          onKeyDown={stopCreatingOnKey}
          onChange={(e) => setNewTaskName(e.target.value)}
          onBlur={stopCreating}
          value={newTaskName}
          placeholder={t('tasks.new-task-placeholder')}
          type="text"
          className="w-full rounded-md my-2 py-1 px-2 outline-none bg-white border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 transition-all ring-0 ring-offset-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black disabled:-my-4 disabled:duration-0 disabled:opacity-0 disabled:py-0 disabled:text-transparent disabled:placeholder:text-transparent"
        />
        <button
          onClick={startCreating}
          className="w-full my-2 font-medium text-zinc-400 dark:text-zinc-500 flex justify-center items-center gap-2 hover:bg-gray-200 dark:hover:bg-zinc-800/50 rounded-md px-2 py-1"
        >
          {t('tasks.add')} <IconPlus size={18} />
        </button>
        {/* {!import.meta.env.PROD && (
          <div className="flex gap-2 items-center">
            Debug:
            <Button
              onClick={() => {
                addTask('Prepare for tests');
                addTask('Write tests');
                addTask('Fix bugs');
                addTask('Find job');
                addTask('Delete root folder');
                addTask('Exploit the planet');
              }}
            >
              Mock tasks
            </Button>
            <Button
              onClick={() => {
                tasks.forEach((t) => removeTask(t.id));
              }}
            >
              <IconTrash />
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}
