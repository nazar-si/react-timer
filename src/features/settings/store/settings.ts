import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { IDuration } from '../../../store/timer/migration.pipline';

export interface ISettingsStore {
  // can timer calculate negative time
  allowOverdue: boolean;
  setAllowOverdue: (v: boolean) => void;
  // show icons instead of button names
  playAlarm: boolean;
  setPlayAlarm: (v: boolean) => void;
  // alarm will be played only on break
  playAlarmOnBreakOnly: boolean,
  setPlayAlarmOnBreakOnly: (v: boolean) => void;
  // hides Zeiter title on screen
  hideTitle: boolean;
  setHideTitle: (v: boolean) => void;
  // saved duration presets
  presets: Array<IDuration>;
  // whether settings modal is visible
  showModal: boolean;
  setModal: (v: boolean) => void;
}

const useSettingsStore = create(
  persist<ISettingsStore>(
    (set, get) => ({
      allowOverdue: true,
      setAllowOverdue: (v) => set({ allowOverdue: v }),
      playAlarm: true,
      setPlayAlarm: (v) => set({ playAlarm: v }),
      playAlarmOnBreakOnly: true,
      setPlayAlarmOnBreakOnly: (v) => set({ playAlarmOnBreakOnly: v }),
      presets: [],
      hideTitle: false,
      setHideTitle: (v) => set({ hideTitle: v }),
      showModal: false,
      setModal: (v) => set({showModal: v}) 
    }),
    {
      name: 'settings-store',
    },
  ),
);

export default useSettingsStore;
