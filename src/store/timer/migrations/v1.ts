export interface ITimerStorePrevious {
    mode: "work" | "break" | "longBreak";
    setMode: (mode: "work" | "break" | "longBreak") => void;
    duration : {
        work: number;
        break: number;
        longBreak: number;
    },
    setDuration: (mode: "work" | "break" | "longBreak", duration: number) => void;
}

export interface ITimerStoreNew {
    mode: "work" | "break" | "longBreak";
    setMode: (mode: "work" | "break" | "longBreak") => void;
    duration : {
        work: number;
        break: number;
        longBreak: number;
    },
    setDuration: (mode: "work" | "break" | "longBreak", duration: number) => void;
}

export function migrate(previousStore: ITimerStorePrevious) : ITimerStoreNew {
    return previousStore;
}