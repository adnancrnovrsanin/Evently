import { Dayjs } from "dayjs";

export interface IEvent {
    id: string;
    title: string;
    date: Dayjs | null;
    description: string;
    category: string;
    anonimity: string;
    country: string;
    city: string;
    venue: string;
}