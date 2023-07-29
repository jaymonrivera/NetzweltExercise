import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/User";
import { router } from "../router/Routes";


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
            runInAction(() => this.user = user);

            router.navigate('territories/all');
           
            //console.log(user);
        } catch (error) {
            console.log(error);
            throw error;
          
        }
    }

}