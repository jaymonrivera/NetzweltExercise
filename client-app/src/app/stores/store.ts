import { createContext, useContext } from "react";
import TerritoryStore from "./territoryStore";
import UserStore from "./userStore";



interface Store {
    territoryStore: TerritoryStore
    userStore:UserStore

}

export const store: Store = {
    territoryStore: new TerritoryStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}