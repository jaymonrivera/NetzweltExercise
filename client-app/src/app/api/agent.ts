import axios, { AxiosResponse } from "axios";
import { Territory } from "../models/Territory";
import { User, UserFormValues } from "../models/User";
const cors = require('cors');
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

//const config = {
//    headers: {
//        'Content-Type': 'application/json',
//        'Access-Control-Allow-Origin': "*",

//    },
//    mode: 'no-cors',
//    withCredentials: true,
//    credentials: 'same-origin'
//};
//axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
//axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';


axios.defaults.baseURL = 'https://netzwelt-devtest.azurewebsites.net'
//axios.defaults.baseURL = 'http://localhost:5000'




axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
})


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
    put:<T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete:<T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Territories = {
    list: () => request.get<Territory[]>('/territories/all'),
   
}

const Account = {
    login: (user: UserFormValues) => request.post<User>('/account/signin',user)
}


const agent = {
    Territories,
    Account
}

export default agent;