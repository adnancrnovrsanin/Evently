import { makeAutoObservable, reaction, runInAction } from "mobx";
import { IEvent } from "../models/event";
import { store } from "./store";
import agent from "../api/agent";
import axios from "axios";

export default class UserDashboardStore {
    eventRegistry = new Map<string, IEvent>();
    loading = false;
    predicate = new Map().set('isGoing', 'true');
    userCity: string | null = null;
    userCountry: string | null = null;
    eventsNearby: IEvent[] = [];

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.eventRegistry.clear();
                this.loadEvents();
            }
        )
    }

    get eventsByDate() {
        return Array.from(this.eventRegistry.values())
            .sort((a, b) => {
                if (this.predicate.get('dateDescending')) {
                    return b.date!.getTime() - a.date!.getTime();
                } else {
                    return a.date!.getTime() - b.date!.getTime();
                }
            });
    }

    get getInviteRequestsForUserByDate() {
        let events = Array.from(this.eventRegistry.values()).filter(e => e.isHost && e.inviteRequests.length > 0);
        events.map(e => e.inviteRequests.map(i => i.event = e));
        let inviteRequests = events.map(e => e.inviteRequests).flat();
        return inviteRequests.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
    }

    resetAllPredicates = () => {
        this.predicate.forEach((value, key) => {
            this.predicate.delete(key);
        })
    }

    resetPredicate = () => {
        this.predicate.forEach((value, key) => {
            if (key !== 'startDate' && key !== 'searchQuery') this.predicate.delete(key);
        })
    }

    resetSortPredicate = () => {
        this.predicate.forEach((value, key) => {
            if (key === 'dateAscending' || key === 'dateDescending') this.predicate.delete(key);
        })
    }

    setPredicate = (predicate: string, value: string | Date) => {
        switch (predicate) {
            case 'isGoing':
                this.resetPredicate();
                this.predicate.set('isGoing', true);
                break;
            case 'isHost':
                this.resetPredicate();
                this.predicate.set('isHost', true);
                break;
            case 'dateAscending':
                this.resetSortPredicate();
                this.predicate.set('dateAscending', true);
                break;
            case 'dateDescending':
                this.resetSortPredicate();
                this.predicate.set('dateDescending', true);
                break;
            case 'searchQuery':
                this.predicate.delete('searchQuery');
                this.predicate.set('searchQuery', value);
                break;
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
                break;
        }
    }

    loadEvents = async () => {
        this.loading = true;
        const params = new URLSearchParams();
        params.append('pageNumber', '1');
        params.append('pageSize', '365');
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, (value as Date).toISOString());
            } else {
                params.append(key, value);
            }
        })

        try {
            const result = await agent.Events.list(params);
            result.data.forEach(event => {
                this.setEvent(event);
            })
            runInAction(() => this.loading = false)
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false)
        }
    }

    getEvent = (id: string) => {
        return this.eventRegistry.get(id);
    }

    setEvent = (event: IEvent) => {
        const user = store.userStore.user;
        if (user) {
            event.isGoing = event.attendees!.some(a => a.username === user.username);
            event.isHost = event.hostUsername === user.username;
            event.host = event.attendees?.find(x => x.username === event.hostUsername);
        }
        event.date = new Date(event.date!);
        event.inviteRequests.map(i => i.createdAt = new Date(i.createdAt));
        this.eventRegistry.set(event.id, event);
    }

    handleChange = (event: IEvent) => {
        this.eventRegistry.set(event.id, event);
        this.loadEvents();
    }
    
    initialLoad = async (username: string) => {
        this.loading = true;
        try {
            await store.profileStore.loadProfile(username);
            await this.loadEvents();
            await store.profileStore.loadFollowings("following");
            const resultLocation = await axios.get(`${import.meta.env.VITE_APP_GEO_API_URL}` + "?api_key=" + `${import.meta.env.VITE_APP_GEO_API_KEY}`);
            runInAction(() => {
                this.userCity = resultLocation.data.city;
                this.userCountry = resultLocation.data.country;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    loadEventsNearby = async () => {
        this.loading = true;
        this.eventsNearby = [];
        try {
            const result = await agent.Events.nearbyEvents(this.userCity!, this.userCountry!);
            runInAction(() => {
                result.data.forEach(e => {
                    e.isHost = e.hostUsername === store.userStore.user?.username;
                    e.isGoing = e.attendees?.some(a => a.username === store.userStore.user?.username);
                    e.host = e.attendees?.find(x => x.username === e.hostUsername);
                    e.date = new Date(e.date!);
                    this.eventsNearby.push(e);
                })
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