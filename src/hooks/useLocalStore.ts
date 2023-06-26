import React, { useEffect, useRef, useState } from "react"; 

function useLocalStore<T = any>(
        key: string, 
        value: T | undefined = undefined, 
        write : (v:T|undefined) => string = v => JSON.stringify(v), 
        read : (v:string) => T|undefined = v => JSON.parse(v),
        update : (v:T|undefined) => unknown = v => undefined
    ) : [T, React.Dispatch<React.SetStateAction<T | undefined>>] {
    const [localValue, setLocalValue] = useState<T | undefined>(value);
    const thisId = React.useId();
    const eventName = `useLocalStore-${key}`;

    // get localValue upon execution
    useEffect(()=>{
        const local = localStorage.getItem(key);
        
        if (local) {
            setLocalValue(read(local));
            update(read(local));
        }
        // add event listener for localValue change
        const ListenForLocalValue = (event: CustomEvent<string>) => {
            // ignore if this event was dispatched by this component to prevent infinite loop
            if (event.detail === thisId) return; 
            const newLocalValue = localStorage.getItem(key);
            const updated = newLocalValue ? read(newLocalValue) : undefined;
            setLocalValue(updated);
        }
        // @ts-expect-error for now we haven't declared that custom event
        window.addEventListener(eventName, ListenForLocalValue);
        // @ts-expect-error same as above
        return ()=>window.removeEventListener(eventName, ListenForLocalValue);
    }, [])
    
    const patchedSetLocalValue = (v: T | undefined | ((value:T|undefined)=>T|undefined)) => {
        let localValueCopy = localValue;
        if (v instanceof Function) {
            localValueCopy = v(localValue);
        } else {
            localValueCopy = v;
        }
        setLocalValue(v);


        update(localValueCopy);
        if (localValueCopy === undefined) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, write(localValueCopy));
        }
        // start custom event marking that it was executed by that hook
        window.dispatchEvent(new CustomEvent<string>(eventName, {detail: thisId}));
    };
        

    return [localValue as T, patchedSetLocalValue];
}
export default useLocalStore;