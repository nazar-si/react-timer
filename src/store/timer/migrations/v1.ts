export interface ITimerStorePrevious {
  mode: 'focus' | 'break' | 'longBreak';
  setMode: (mode: 'focus' | 'break' | 'longBreak') => void;
  duration: {
    focus: number;
    break: number;
    longBreak: number;
  };
  setDuration: (
    mode: 'focus' | 'break' | 'longBreak',
    duration: number,
  ) => void;
}

export interface ITimerStoreNew {
  mode: 'focus' | 'break' | 'longBreak';
  setMode: (mode: 'focus' | 'break' | 'longBreak') => void;
  duration: {
    focus: number;
    break: number;
    longBreak: number;
  };
  setDuration: (
    mode: 'focus' | 'break' | 'longBreak',
    duration: number,
  ) => void;
}

export function migrate(previousStore: ITimerStorePrevious): ITimerStoreNew {
  return previousStore;
}
