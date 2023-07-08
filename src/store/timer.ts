import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEV = import.meta.env.DEV;

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
            work:       25 * (DEV ? 1 : 60),
            break:      5  * (DEV ? 1 : 60),
            longBreak:  15 * (DEV ? 1 : 60),
        },
        setDuration: (mode, duration) => set({ duration: { ...get().duration, [mode]: duration } }),
    }), 
    {
        name: "timer-storage",
        version: 1
    }
));

export default useTimerStore; 