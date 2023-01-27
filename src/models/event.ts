import { InviteRequest } from "./inviteRequest";
import { Profile } from "./profile";

export interface IEvent {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date | null;
    country: string;
    city: string;
    venue: string;
    anonimity: string;
    hostUsername?: string;
    isCancelled?: boolean;
    isGoing?: boolean;
    isHost?: boolean
    attendees: Profile[]
    inviteRequests: InviteRequest[]
    host?: Profile;
}

export class EventFormValues
  {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    country: string = '';
    city: string = '';
    venue: string = '';
    anonimity: string = '';

	  constructor(event?: EventFormValues) {
      if (event) {
        this.id = event.id;
        this.title = event.title;
        this.category = event.category;
        this.description = event.description;
        this.date = event.date;
        this.country = event.country;
        this.venue = event.venue;
        this.city = event.city;
        this.anonimity = event.anonimity;
      }
    }

  }

  export class IEvent implements IEvent {
    constructor(init?: EventFormValues) {
      Object.assign(this, init);
    }
  }
