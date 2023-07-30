import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import SiteConstant from "../helper/site-constant";
import { User, UserFormValues } from "../models/User";
import { router } from "../router/Routes";
import { store } from "./store";



export default class UserStore {
    user: User | null = null;
    constructor() {
           makeAutoObservable(this)
    }

   
    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        var _self = this;

        try {

          

            let user: User|null  = null ;
            if (!SiteConstant.UseDummyConnection) {
                user = await agent.Account.login(creds);
                store.commonStore.setToken(user.username);

            }
            else {
                if (creds.username === 'foo' && creds.password === 'bar') {

                    _self.getUser();
                    user = this.user;
                    store.commonStore.setToken(creds.username);
                   
                }
                else {
                    throw DOMException;
                }
            }

            runInAction(() => this.user = user);
            router.navigate('/');
           
        } catch (error) {
            console.log(error);
            throw error;
          
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/account/login')
      
    }

    getUser = async () => {

        const user: User = { displayName: "Foo Bar Foo", username: "foo" }; 

        
        runInAction(() =>  this.user = user);
    }

}