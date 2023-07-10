import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import migrate, { ITimerStore } from './migration.pipline';

const PROD = import.meta.env.PROD;

const useTimerStore = create(
  persist<ITimerStore>(
    (set, get) => ({
      mode: 'focus',
      setMode: (mode) => set({ mode }),
      duration: {
        focus: 25 * (PROD ? 60 : 1),
        break: 5 * (PROD ? 60 : 1),
        longBreak: 15 * (PROD ? 60 : 1),
      },
      setDuration: (mode, duration) =>
        set({ duration: { ...get().duration, [mode]: duration } }),
    }),
    {
      name: 'timer-storage',
      version: 1,
      migrate,
    },
  ),
);

export default useTimerStore;
