import { persist } from 'zustand/middleware';
import { create } from 'zustand';

export interface ISettingsStore {
  allowOverdue: boolean;
}

const useSetttingsStore = create(
  persist<ISettingsStore>(
    (set, get) => ({
      allowOverdue: true,
    }),
    {
      name: 'settings-store',
    },
  ),
);

export default useSetttingsStore;
