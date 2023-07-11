import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { IDuration } from './timer/migration.pipline';

export interface ISettingsStore {
  // can timer calculate negative time
  allowOverdue: boolean;
  // show icons instead of button names
  prefersIcons: boolean;
  // saved duration presets
  presets: Array<IDuration>;

}

const useSetttingsStore = create(
  persist<ISettingsStore>(
    (set, get) => ({
      allowOverdue: true,
      prefersIcons: false,
      presets: [],
    }),
    {
      name: 'settings-store',
    },
  ),
);

export default useSetttingsStore;
