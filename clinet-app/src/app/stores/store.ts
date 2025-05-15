import { createContext, useContext } from "react";
import MemberStore from "./MemberStore";


interface Store {
    memberStore : MemberStore;
}

// The states (value)
export const store : Store = {
    memberStore : new MemberStore()
}

// state provider (context)
export const StoreContext = createContext(store);

export function useStore() {

    return useContext(StoreContext)
}