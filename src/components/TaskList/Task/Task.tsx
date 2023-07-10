import React, { useEffect, useRef } from 'react';
import Button from '../../ui/Button/Button';
import useTasksStore, { Task } from '../../../store/tasks';
import { IconCheck, IconCornerDownRight, IconGripVertical, IconIndentIncrease, IconTrash } from '@tabler/icons-react';
import { classNames } from '../../../utls/classnames';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';

type Props = {
  task: Task;
  index: number;
};

export const TASK_TYPE = 'TASK_TYPE';

interface DragTask {
  id: number;
  index: number;
  type: string;
}

const style = {
  wrapper:
    'grid grid-cols-[2rem_1fr_2rem] p-1 w-full gap-2 relative ease-in-out rounded-md',
  wrapperDragged: 'opacity-50',
  input:
    'flex-1 rounded-md py-1 px-2 outline-none bg-white border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 transition-all ring-0 ring-offset-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black',
  grip: 'absolute top-0 bottom-[2px] -left-8 !mr-10 pl-4 text-gray-400 dark:text-zinc-500 flex justify-center items-center cursor-grab transition-all duration-200 opacity-0',
  actions:
    'absolute h-fit top-1/2 -translate-y-1/2 bottom-0 -right-4 flex flex-col gap-0 items-center opacity-0 transition-all',
  actionsActive: 'opacity-100 !-right-8',
  actionButton:
    'transition-all !p-0 opacity-0 h-6 w-6 flex justify-center items-center -m-3 pointer-events-none',
  actionButtonActive: 'm-[0.125rem] opacity-100 pointer-events-auto',
};

export default function Task({ task, index }: Props) {
  const setName = useTasksStore((s) => s.setName);
  const toggleTask = useTasksStore((s) => s.toggleTask);
  const removeTask = useTasksStore((s) => s.removeTask);
  const hideTask = useTasksStore((s) => s.hideTask);
  const [isUsed, setIsUsed] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const sortable = useSortable({ id: task.id });
  const { t } = useTranslation();

  const elementRef = useRef<HTMLDivElement>(null);

  const deleteTask = (id: number) => {
    hideTask(id);

    setTimeout(() => {
      removeTask(id);
    }, 300);
    // removeTask(id);
  };

  sortable.setNodeRef(elementRef.current);

  return (
    <div
      key={task.id}
      ref={elementRef}
      className={classNames(
        style.wrapper,
        task.hide && 'opacity-0',
        sortable.isDragging && style.wrapperDragged,
      )}
      style={{
        ...(task.hide
          ? {
              marginTop: `-${elementRef.current!.clientHeight / 2}px`,
              marginBottom: `-${elementRef.current!.clientHeight / 2}px`,
            }
          : {}),
        transform:
          sortable.isOver || sortable.isDragging || sortable.isSorting
            ? CSS.Transform.toString(sortable.transform)
            : 'none',
        transition:
          sortable.isDragging || sortable.transform === null
            ? '0.3s, transform 0s'
            : '0.3s',
        // transition: sortable.transition,
      }}
      onFocus={() => setIsUsed(true)}
      onMouseOver={() => setIsUsed(true)}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.currentTarget.contains(document.activeElement)) return;
        setIsUsed(false);
        setIsMenuOpen(false);
      }}
      onBlur={(e: React.FocusEvent<HTMLDivElement, Element>) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsUsed(false);
        setIsMenuOpen(false);
      }}
      {...sortable.attributes}
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
        placeholder={t('tasks.task-placeholder')}
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
        {...sortable.listeners}
        className={classNames(
          style.grip,
          (isUsed || sortable.isDragging) && 'opacity-100',
          !(isUsed || sortable.isDragging) && 'scale-50 -left-4',
        )}
      >
        <IconGripVertical size={20} />
      </div>
      <div className={classNames(style.actions, isUsed && style.actionsActive)}>
        {/* Reserved for future use */}
        {/* <Button
          className={classNames(
            style.actionButton,
            isUsed && !isMenuOpen && style.actionButtonActive,
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IconDotsVertical size={16} />
        </Button>
        <Button
          className={classNames(
            style.actionButton,
            isUsed && isMenuOpen && style.actionButtonActive,
          )}
        >
          <IconLink size={16} />
        </Button>
        <Button
          className={classNames(
            style.actionButton,
            isUsed && isMenuOpen && style.actionButtonActive,
          )}
        >
          <IconIndentIncrease size={16} />
        </Button> */}
      </div>
      {task.description && (
        <>
          <div className='w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-400'>
            <IconCornerDownRight />
          </div>
          <input
          type="text"
          role="description"
          placeholder="Description"
          className={classNames('col-span-2 flex-1', style.input)}
        />
        </>
      )}
    </div>
  );
}
