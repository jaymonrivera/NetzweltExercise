import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
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
        try {

            //if (creds.username === 'foo' && creds.password === 'bar') {
            //    router.navigate('territories/all');
            //}
            //else {
            //    throw DOMException;
            //}


            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.username);
            runInAction(() => this.user = user);


            router.navigate('/');
           
            //console.log(user);
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