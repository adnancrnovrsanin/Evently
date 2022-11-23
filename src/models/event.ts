export interface IEvent {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    country: string;
    city: string;
    venue: string;
}