import { Profile } from "./profile";

export interface IEvent {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date | null;
    city: string;
    venue: string;
    hostUsername?: string;
    isCancelled?: boolean;
    isGoing?: boolean;
    isHost?: boolean
    attendees: Profile[]
    host?: Profile;
}

export class EventFormValues
  {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';
    venue: string = '';

	  constructor(event?: EventFormValues) {
      if (event) {
        this.id = event.id;
        this.title = event.title;
        this.category = event.category;
        this.description = event.description;
        this.date = event.date;
        this.venue = event.venue;
        this.city = event.city;
      }
    }

  }

  export class IEvent implements IEvent {
    constructor(init?: EventFormValues) {
      Object.assign(this, init);
    }
  }
