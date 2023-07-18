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

const useAnalyticsStore = create(
  persist<IAnalyticsStore>(
    (set, get) => ({
      events: new Map(),
      globalId: 0,
      dispatchEvent: (mode) => {
        set({
          events: new Map(
            [...get().events.entries()].concat([
              get().globalId + 1,
              {
                mode,
                startTime: new Date(),
                countedTime: 0,
              },
            ]),
          ),
          globalId: get().globalId + 1,
        });
        return get().globalId + 1;
      },
      addTimeToEvent: (eventId, time) => {
        const e = get().events.get(eventId);
        if (!e) return;
        set({
          events: new Map([
            ...get().events.entries(),
            [
              eventId,
              {
                ...e,
                countedTime: e.countedTime + time,
              },
            ],
          ]),
        });
      },
      stopEvent: (eventId) =>
        set({
          events: new Map(
            [...get().events.entries()].filter(([id, _]) => id !== eventId),
          ),
        }),
    }),
    {
      name: 'analytics-store',
      version: 1,
    },
  ),
);

export default useAnalyticsStore;
