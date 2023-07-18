import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import MapJSON, { reviver, replacer } from '@/utls/mapJSON';

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

const useAnalyticsStore = create(
  persist<IAnalyticsStore>(
    (set, get) => ({
      events: new Map(),
      globalId: 3,
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
    }),
    {
      name: 'analytics-store',
      version: 1,
      storage: {
        getItem: (name) => {
          const v = localStorage.getItem(name);
          if (!v) return;
          return MapJSON.parse(v);
        },
        setItem: (name, value) => {
          localStorage.setItem(name, MapJSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);

export default useAnalyticsStore;
