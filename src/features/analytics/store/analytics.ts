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

function toDateString(d: string | Date) {
  if (d instanceof Date) {
    return d.toDateString();
  }
  return new Date(d).toDateString();
}
function ensureDate(d: string | Date) {
  if (typeof d === 'string') {
    return new Date(d);
  }
  return d;
}

export type Statistics = Array<Record<modeType, number> & { date: Date }>;

export interface IAnalyticsStore {
  globalId: number;
  events: Map<number, IEvent>;
  actions: () => {
    dispatchEvent: (mode: modeType, date?: Date) => number;
    addTimeToEvent: (eventId: number, time: number) => void;
    setEventTime: (eventId: number, time: number) => void;
    stopEvent: (eventId: number) => void;
    getTotalTime: (mode: modeType, day: Date) => number;
    getStatistics: () => Statistics;
  };
}
const useAnalyticsStore = create(
  persist<IAnalyticsStore>(
    (set, get) => ({
      events: new Map(),
      globalId: 3,
      actions: () => ({
        dispatchEvent: (mode, date) => {
          set((s) => ({
            events: new Map(s.events).set(s.globalId + 1, {
              mode,
              startTime: date ? new Date(date) : new Date(),
              countedTime: 0,
            }),
            globalId: s.globalId + 1,
          }));
          return get().globalId;
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
        setEventTime: (eventId, time) => {
          const e = get().events.get(eventId);
          if (!e) return;
          set((s) => ({
            events: new Map(s.events).set(eventId, {
              ...e,
              countedTime: time,
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
        getTotalTime: (mode, day) => {
          const events = Array.from(get().events.values());
          const total = events
            .filter(
              (e) =>
                e.finishTime &&
                toDateString(e.startTime) === day.toDateString() &&
                e.mode === mode,
            )
            .reduce((a, b) => ({
              ...a,
              ...b,
              countedTime: a.countedTime + b.countedTime,
            })).countedTime;
          return total;
        },
        getStatistics: () => {
          const events = Array.from(get().events.values());
          const dates: Record<string, Record<modeType, number>> = {};
          events.forEach((e) => {
            if (!e.finishTime) return;
            const date = toDateString(e.startTime);
            if (!(date in dates)) {
              dates[date] = {
                focus: 0,
                break: 0,
                longBreak: 0,
              };
            }
            dates[date][e.mode] += e.countedTime;
          });
          return Object.entries(dates).map((e) => ({
            date: ensureDate(e[0]),
            ...e[1],
          }));
        },
      }),
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
