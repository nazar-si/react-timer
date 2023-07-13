import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { IDuration } from './timer/migration.pipline';

export interface ISettingsStore {
  // can timer calculate negative time
  allowOverdue: boolean;
  setAllowOverdue: (v: boolean) => void;
  // show icons instead of button names
  playAlarm: boolean;
  setPlayAlarm: (v: boolean) => void;
  // saved duration presets
  presets: Array<IDuration>;
}

const useSetttingsStore = create(
  persist<ISettingsStore>(
    (set, get) => ({
      allowOverdue: true,
      setAllowOverdue: (v) => set({ allowOverdue: v }),
      playAlarm: true,
      setPlayAlarm: (v) => set({ playAlarm: v }),
      presets: [],
    }),
    {
      name: 'settings-store',
    },
  ),
);

export default useSetttingsStore;
