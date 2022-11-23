import axios, { AxiosResponse } from 'axios';
import { IEvent } from '../models/event';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
};

const Events = {
    list: () => requests.get<IEvent[]>('/events'),
    details: (id: string) => requests.get<IEvent>(`/events/${id}`),
    create: (event: IEvent) => requests.post<void>(`/events`, event),
    update: (event: IEvent) => requests.put<void>(`/events/${event.id}`, event),
    delete: (id: string) => requests.del<void>(`/events/${id}`)
}

const agent = {
    Events
}

export default agent;