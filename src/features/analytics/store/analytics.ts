import { persist } from 'zustand/middleware';
import { create } from 'zustand';

export type modeType = 'focus' | 'break' | 'longBreak';
export interface IEvent {
  mode: modeType;
  startTime: Date;
  finishTime?: Date;
  countedTime: number;
}

export interface IAnalyticsStore {
  globalId: number;
  events: Map<number, IEvent>;
  dispatchEvent: (mode: modeType) => number;
  addTimeToEvent: (eventId: number, time: number) => void;
  stopEvent: (eventId: number) => void;
}

const useAnalyticsStore = create<IAnalyticsStore>((set, get) => ({
  events: new Map(),
  globalId: 0,
  dispatchEvent: (mode) => {
    console.log(get().events);
    set((s) => ({
      events: new Map(s.events).set(s.globalId + 1, {
        mode,
        startTime: new Date(),
        countedTime: 0,
      }),
      globalId: s.globalId + 1,
    }));
    return get().globalId + 1;
  },
  addTimeToEvent: (eventId, time) => {
    const e = get().events.get(eventId);
    if (!e) return;
    set((s) => ({
      events: new Map(s.events).set(eventId, {
        ...e,
        countedTime: e.countedTime + time,
      }),
    }));
  },
  stopEvent: (eventId) => {
    const e = get().events.get(eventId);
    if (!e) return;
    set((s) => ({
      events: new Map(s.events).set(eventId, {
        ...e,
        finishTime: new Date(),
      }),
    }));
  },
}));

export default useAnalyticsStore;
