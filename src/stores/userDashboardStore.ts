import { makeAutoObservable, reaction, runInAction } from "mobx";
import { IEvent } from "../models/event";
import { store } from "./store";
import { TroubleshootOutlined } from "@mui/icons-material";
import agent from "../api/agent";

export default class UserDashboardStore {
    eventRegistry = new Map<string, IEvent>();
    loading = false;
    predicate = new Map().set('isGoing', 'true');

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

    private getEvent = (id: string) => {
        return this.eventRegistry.get(id);
    }

    private setEvent = (event: IEvent) => {
        const user = store.userStore.user;
        if (user) {
            event.isGoing = event.attendees!.some(a => a.username === user.username);
            event.isHost = event.hostUsername === user.username;
            event.host = event.attendees?.find(x => x.username === event.hostUsername);
        }
        event.date = new Date(event.date!);
        this.eventRegistry.set(event.id, event);
    }
}