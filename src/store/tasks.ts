import {create} from "zustand";
import {persist} from "zustand/middleware"

export type Task = {
    name: string,
    done : boolean,
    id : number,
    hide ?: boolean
}

export interface ITaskStore {
    tasks : Task[],
    globalId : number,
    addTask : (taskName : string) => void,
    removeTask : (id : number) => void,
    toggleTask : (id : number) => void,
    hideTask : (id : number) => void,
    setName : (id : number, name : string) => void
}

const useTasksStore = create(persist<ITaskStore>(
    (set, get)=> ({
        tasks : [],
        globalId : 0,
        addTask : (taskName) => set({tasks : [...get().tasks, {name : taskName, done : false, id : get().globalId}], globalId : get().globalId + 1}),
        removeTask : (id) => set({tasks : get().tasks.filter(task => task.id !== id)}),
        toggleTask : (id) => set({tasks : get().tasks.map(task => task.id === id ? {...task, done : !task.done} : task)}), 
        hideTask : (id) => set({tasks : get().tasks.map(task => task.id === id ? {...task, hide : true} : task)}),
        setName : (id, name) => set({tasks : get().tasks.map(task => task.id === id ? {...task, name : name} : task)})
    }),
    {
        name: "tasks-storage",
    }
))

export default useTasksStore;