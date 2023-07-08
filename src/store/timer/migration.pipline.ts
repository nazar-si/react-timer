import { ITimerStoreNew, migrate as migrateV1 } from "./migrations/v1";
export type ITimerStore = ITimerStoreNew;

// migration pipline
const migrations : Array<(s:any)=>any> = [
    migrateV1
]

export default function migrate(persistedState : unknown, version : number){
    let state = persistedState;
    for (let i = version; i < migrations.length; i++) {
        state = migrations[i](state);
    }
    return state as ITimerStore;
}