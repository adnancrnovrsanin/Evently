import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IEvent } from "../models/event";
import { v4 as uuid } from 'uuid';
import dayjs from "dayjs";

export default class EventStore {
    eventRegistry = new Map<string, IEvent>();
    selectedEvent: IEvent | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get eventsByDate() {
        return Array.from(this.eventRegistry.values()).sort((a, b) => a.date!.diff(b.date!, 'millisecond', true));
    }

    get groupedEvents() {
        return Object.entries (
            this.eventsByDate.reduce((events, event) => {
                const date = event.date!.format('DD MM YYYY');
                events[date] = events[date] ? [...events[date], event] : [event];
                return events;
            }, {} as {[key: string]: IEvent[]})
        )
    }

    loadEvents = async () => {
        try {
            const events = await agent.Events.list();

            events.forEach(event => {
                this.setEvent(event);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadEvent = async (id: string) => {
        let event = this.getEvent(id);
        if (event) {
            this.selectedEvent = event;
            return event;
        } else {
            this.loadingInitial = true;
            try {
                event = await agent.Events.details(id);
                this.setEvent(event);
                runInAction(() => {
                    this.selectedEvent = event;
                })
                this.selectedEvent = event;
                return event;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setEvent = (event: IEvent) => {
        event.date = dayjs(event.date!)
        this.eventRegistry.set(event.id, event);
    }

    private getEvent = (id: string) => {
        return this.eventRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createEvent = async (event: IEvent) => {
        this.loading = true;
        event.id = uuid();
        try {
            await agent.Events.create(event);
            runInAction(() => {
                this.eventRegistry.set(event.id, event);
                this.selectedEvent = event;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateEvent = async (event: IEvent) => {
        this.loading = true;
        try {
            await agent.Events.update(event);
            runInAction(() => {
                this.eventRegistry.set(event.id, event);
                this.selectedEvent = event;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteEvent = async (id: string) => {
        this.loading = true;
        try {
            await agent.Events.delete(id);
            runInAction(() => {
                this.eventRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}