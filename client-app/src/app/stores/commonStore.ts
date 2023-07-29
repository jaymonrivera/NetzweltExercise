import { makeAutoObservable, reaction } from "mobx";
import { router } from "../router/Routes";


export default class CommonStore {
    appLoaded = false;
    token: string | null = localStorage.getItem('username');

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('username', token);

                }
                else {

                    localStorage.removeItem('username');
                    
                }
            }
        )
    }


    setToken = (token:string|null) => {
      
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
    
}