import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../router/Routes";
import { Address, Member } from "../../lib/types";

// import { toast } from "react-toastify";
//import { Result } from "../models/result";
//import { User, UserFormValues } from "../models/users";
//import { store } from "../stores/store";
//import { router } from "../router/Routes";
//import { Photo, Profile, UserActivity } from "../models/Profile";
//import { store } from "../stores/store";
//import { toast } from "react-toastify";


function sleep(delay: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}


axios.defaults.baseURL = 'https://localhost:5001/api';
//https://localhost:5001/api/members
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use( config => {
    //const token = store.commonStore.token;
   // if(token && config.headers) config.headers.Authorization = `Bearer ${token}`

    return config;
});

axios.interceptors.response.use(async response => {
    //  PLEASE NOTE -how Promise work in ->axios.interceptors.response.use() as follow
    // const promise = new Promise((resolve, reject) =>{}  *resolve=>return response; && reject => return Promise.reject(error);)
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                console.log(data.errors);
                router.navigate('/not-found')
            }
            if (data.errors) {
             
                const modalStateError = [];
                for (const key in data.errors) {
                    if(data.errors[key]){
                        modalStateError.push(data.errors[key]);
                    }
                }
                throw modalStateError.flat();
             
            } else {
              //  toast.error(data);
            }
          //  toast.error('bad request');
            break;
        case 401:
          //  toast.error('unauthorised');
            break;
        case 403:
          //  toast.error('forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
        //     store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }

    return Promise.reject(error);
})

const requests = {

    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    // post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    // put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    post: <T>(url: string, body: Member) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: Member) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}


const Members = {
    // list: () => requests.get<Result>(`/activities`),
    list: () => requests.get<Member[]>(`/members`),
    details: (id: string) => requests.get<Member>(`/members/${id}`),
    create: (member: Member) => requests.post<void>(`/members/`, member),
    update: (member: Member) => requests.put<void>(`/members/${member?.id}`, member),
    
    delete: (id: string) => requests.delete(`/members/${id}`),
    //http://localhost:5000/api/activities/id/attend
   // attend: (id: string) => requests.post(`/members/${id}/attend`, {}),
    
}

const MemberAddresses = { 

    // list: () => requests.get<Address[]>(`/addresses`),
    // details: (id: string) => requests.get<Address>(`/addresses/${id}`),
   // create: (address: Address) => requests.post<void>(`/addresses/`, address),
    // update: (activity: AddressFormValues) => requests.put<void>(`/addresses/${activity.id}`, activity),
   // update: (address: Address) => requests.put<void>(`/addresses/${address.id}`, address),
    delete: (id: string) => requests.delete(`/addresses/${id}`),
}  
const Account = {
    //current: () => requests.get<User>('/account'),
    //login: (user: UserFormValues) => requests.post<User>('/account/login', user),
   // register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

// const Profiles = {
//     //get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
//     uploadPhoto: (file: File) => {
//     //    let formData = new FormData();
//         formData.append('File', file);
//         return axios.post<Photo>('photos', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         })
//     },
//     setMainPhoto: (id: string) => axios.post(`/photos/${id}/setMain`, {}),
//     deletePhoto: (id: string) => axios.delete(`/photos/${id}`),
//     updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
//     updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
//     listFollowings: (username: string, predicate: string) => requests
//         .get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
//     listActivities: (username: string, predicate: string) =>
//         requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
// }

const agent = {
    Members,
    Account,
    MemberAddresses,
   // Profiles
}

export default agent;


