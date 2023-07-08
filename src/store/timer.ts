import { create } from "zustand";
import { persist } from "zustand/middleware";

const PROD = import.meta.env.PROD;

export interface ITimerStore {
    mode: "work" | "break" | "longBreak";
    setMode: (mode: "work" | "break" | "longBreak") => void;
    duration : {
        work: number;
        break: number;
        longBreak: number;
    },
    setDuration: (mode: "work" | "break" | "longBreak", duration: number) => void;
}

const useTimerStore = create(persist<ITimerStore>((set, get) => ({
        mode: "work",
        setMode: (mode) => set({ mode }),
        duration: {
            work:       25 * (PROD ? 60 : 1),
            break:      5  * (PROD ? 60 : 1),
            longBreak:  15 * (PROD ? 60 : 1),
        },
        setDuration: (mode, duration) => set({ duration: { ...get().duration, [mode]: duration } }),
    }), 
    {
        name: "timer-storage",
        version: 1
    }
));

export default useTimerStore; 