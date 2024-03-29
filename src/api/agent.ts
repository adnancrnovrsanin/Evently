import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { EventFormValues, IEvent } from "../models/event";
import { PaginatedResult } from "../models/pagination";
import { Photo, Profile, UserEvent } from "../models/profile";
import { GoogleAuthDto, User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { ResetPasswordDto } from "../models/resetPasswordDto";


axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    if (status)
        switch (status) {
            case 400:
                if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                    router.navigate('/not-found');
                }
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key])
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                if (data.split("|")[0].trim() === "Email not verified") {
                    toast.error("Email not verified");
                    const email = data.split("|")[1];
                    requests.get<void>(`/account/resendEmailConfirmationLink?email=${email}`);
                    router.navigate(`/account/registerSuccess?email=${email}`);
                    store.loginDialogStore.closeLoginDialog();
                } else {
                    if (!data || data === "") {
                        toast.error("Unauthorized");
                    } else {
                        toast.error(data);
                    }
                }
                break;
            case 403:
                toast.error('forbidden')
                break;
            case 404:
                toast.error('Not Found');
                break;
            case 500:
                store.commonStore.setServerError(data);
                router.navigate('/server-error');
                break;
        }
    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Events = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<IEvent[]>>('/events', { params })
        .then(responseBody),
    nearbyEvents: (city: string, country: string) => axios.get<IEvent[]>(`/events/near`, { params: { city, country } }),
    details: (id: string) => requests.get<IEvent>(`/events/${id}`),
    create: (event: EventFormValues) => requests.post<void>(`/events`, event),
    update: (event: EventFormValues) => requests.put<void>(`/events/${event.id}`, event),
    delete: (id: string) => requests.del<void>(`/events/${id}`),
    attend: (id: string) => requests.post<void>(`/events/${id}/attend`, {}),
    reportHost: (id: string) => requests.post<void>(`/events/${id}/reportHost`, {}),
    requestInvite: (id: string) => requests.post<void>(`/events/${id}/requestInvite`, {}),
    removeInviteRequest: (id: string, username: string) => requests.del<void>(`/events/${id}/removeRequest?username=${username}`),
    acceptInviteRequest: (id: string, username: string) => requests.post<void>(`/events/${id}/acceptRequest?username=${username}`, {}),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    googleAuth: (user: GoogleAuthDto) => requests.post<User>('/account/googleAuth', user),
    verifyEmail: (token: string, email: string) => requests.post<void>(`/account/verifyEmail?token=${token}&email=${email}`, {}),
    resendEmailConfirmationLink: (email: string) => requests.get(`/account/resendEmailConfirmationLink?email=${email}`),
    requestPasswordReset: (email: string) => requests.post<void>(`/account/forgotPassword?email=${email}`, {}),
    resetPassword: (resetPasswordDto: ResetPasswordDto) => requests.post<void>(`/account/resetPassword`, resetPasswordDto),
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: any) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('/photos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    setMainPhoto: (id: string) => axios.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => axios.delete(`/photos/${id}`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
    listFollowings: (username: string, predicate: string) => requests
        .get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
    listEvents: (username: string, predicate: string) =>
        requests.get<UserEvent[]>(`/profiles/${username}/events?predicate=${predicate}`),
    deleteProfile: () => requests.del(`/profiles`),
}

const Admin = {
    getReportedUsers: () => axios.get<Array<Profile>>('/admin/reportedUsers'),
    deleteReportedUser: (username: string) => axios.delete(`/admin/deleteUser/${username}`),
}

const agent = {
    Events,
    Account,
    Profiles,
    Admin
}

export default agent;