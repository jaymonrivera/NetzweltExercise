import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import TerritoryStore from "./territoryStore";
import UserStore from "./userStore";



interface Store {
    territoryStore: TerritoryStore
    userStore: UserStore,
    commonStore: CommonStore

}

export const store: Store = {
    territoryStore: new TerritoryStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),

}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}