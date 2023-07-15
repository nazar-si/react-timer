import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import update from 'immutability-helper';

export type Task = {
  name: string;
  done: boolean;
  id: number;
  hide?: boolean;
  description?: string;
};

export interface ITaskStore {
  tasks: Task[];
  globalId: number;
  addTask: (taskName: string) => void;
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
  hideTask: (id: number) => void;
  setName: (id: number, name: string) => void;
  moveTask: (id: number, to: number) => void;
}

const useTasksStore = create(
  persist<ITaskStore>(
    (set, get) => ({
      tasks: [],
      globalId: 1,
      addTask: (taskName) =>
        set({
          tasks: [
            ...get().tasks,
            { name: taskName, done: false, id: get().globalId },
          ],
          globalId: get().globalId + 1,
        }),
      removeTask: (id) =>
        set({ tasks: get().tasks.filter((task) => task.id !== id) }),
      toggleTask: (id) =>
        set({
          tasks: get().tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task,
          ),
        }),
      hideTask: (id) =>
        set({
          tasks: get().tasks.map((task) =>
            task.id === id ? { ...task, hide: true } : task,
          ),
        }),
      setName: (id, name) =>
        set({
          tasks: get().tasks.map((task) =>
            task.id === id ? { ...task, name: name } : task,
          ),
        }),
      moveTask: (dragIndex: number, hoverIndex: number) => {
        set((state) => ({
          tasks: update(state.tasks, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, state.tasks[dragIndex]],
            ],
          }),
        }));
      },
    }),
    {
      name: 'tasks-storage',
    },
  ),
);

export default useTasksStore;
