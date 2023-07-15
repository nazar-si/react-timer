import { persist } from 'zustand/middleware';
import { create } from 'zustand';
export interface IEvent {
  mode: 'focus' | 'break' | 'longBreak';
  startTime: Date;
  finishTime?: Date;
}

export interface IAnalyticsStore {
  events: Array<IEvent>;
}

const useAnalyticsStore = create(
  persist<IAnalyticsStore>(
    (set, get) => ({
      events: [],
    }),
    {
      name: 'analytics-store',
    },
  ),
);
