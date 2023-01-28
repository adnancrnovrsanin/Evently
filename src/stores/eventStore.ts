import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import agent from "../api/agent";
import { EventFormValues, IEvent } from "../models/event";
import { Profile } from "../models/profile";
import { store } from "./store";
import { toast } from "react-toastify";
import { InviteRequest } from "../models/inviteRequest";

export default class EventStore {
    eventRegistry = new Map<string, IEvent>();
    selectedEvent?: IEvent = undefined;
    editMode = false;
    loadingInitial = false;
    loading = false;
    pagination: Pagination | null = null;
    predicate = new Map().set('all', true);
    pagingParams = new PagingParams();
    usersEvents: IEvent[] = [];

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.eventRegistry.clear();
                this.loadEvents();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    resetAllPredicates = () => {
        this.predicate.forEach((value, key) => {
            if (key !== 'startDate') this.predicate.delete(key);
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
            case 'all':
                this.resetAllPredicates();
                this.predicate.set('all', true);
                break;
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

    get usersEventsByDate() {
        return this.usersEvents.sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    
    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, (value as Date).toISOString());
            } else {
                params.append(key, value);
            }
        })
        return params;
    }
    
    loadEventsUserIsGoing = async () => {
        this.loading = true;
        const params = new URLSearchParams();
        const user = store.userStore.user;
        params.append('pageNumber', '1');
        params.append('pageSize', '365');
        params.append('isgoing', 'true');
        try {
            const result = await agent.Events.list(params);
            result.data.forEach(e => {
                this.usersEvents.push(e);
                if (user) {
                    e.isGoing = e.attendees?.some(a => a.username === user.username);
                    e.isHost = e.hostUsername === user.username;
                    e.host = e.attendees?.find(a => a.username === e.hostUsername);
                }
                e.date = new Date(e.date!);
            });
            runInAction(() => {
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    loadEvents = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Events.list(this.axiosParams);
            result.data.forEach(event => {
                this.setEvent(event);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadEvent = async (id: string) => {
        let event = this.getEvent(id);
        if (event) {
            this.selectedEvent = event;
            return event;
        } else {
            this.setLoadingInitial(true);
            try {
                event = await agent.Events.details(id);
                this.setEvent(event);
                runInAction(() => this.selectedEvent = event);
                this.setLoadingInitial(false);
                return event;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setEvent = (event: IEvent) => {
        const user = store.userStore.user || { username: '', displayName: '', image: null };
        if (user) {
            event.isGoing = event.attendees?.some(a => a.username === user.username);
            event.isHost = event.hostUsername === user.username;
            event.host = event.attendees?.find(a => a.username === event.hostUsername);
        }
        event.date = new Date(event.date!);
        this.eventRegistry.set(event.id, event);
    }

    private getEvent = (id: string) => {
        return this.eventRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createEvent = async (event: EventFormValues) => {
        this.loading = true;
        const user = store.userStore!.user;
        const profile = new Profile(user!);

        try {
            await agent.Events.create(event);
            const newEvent = new IEvent(event);
            newEvent.hostUsername = user?.username;
            newEvent.host = profile;
            newEvent.isHost = true;
            newEvent.isGoing = true;
            newEvent.attendees.push(profile);
            this.setEvent(newEvent);
            store.userDashboardStore.setEvent(newEvent);
            runInAction(() => {
                this.selectedEvent = newEvent;
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    updateEvent = async (event: EventFormValues) => {
        this.loading = true;
        try {
            await agent.Events.update(event);
            runInAction(() => {
                if (event.id) {
                    let updatedEvent = { ...this.getEvent(event.id), ...event };
                    this.eventRegistry.set(event.id, updatedEvent as IEvent);
                    store.userDashboardStore.handleChange(updatedEvent as IEvent)
                    this.selectedEvent = updatedEvent as IEvent;
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    deleteEvent = async (id: string) => {
        this.loading = true;
        try {
            await agent.Events.delete(id);
            runInAction(() => {
                this.eventRegistry.delete(id);
                store.userDashboardStore.eventRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateAttendeance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Events.attend(this.selectedEvent!.id);
            runInAction(() => {
                if (this.selectedEvent?.isGoing) {
                    this.selectedEvent.attendees = this.selectedEvent.attendees?.filter(a => a.username !== user?.username);
                    this.selectedEvent.isGoing = false;
                } else {
                    const attendee = new Profile(user!);
                    this.selectedEvent?.attendees?.push(attendee);
                    this.selectedEvent!.isGoing = true;
                }
                this.eventRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
                store.userDashboardStore.handleChange(this.selectedEvent!);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    // expelAttendee = async (username: string) => {
    //     this.loading = true;
    //     try {
    //         await agent.Events.expel(this.selectedEvent!.id, username);
    //         runInAction(() => {
    //             this.selectedEvent!.attendees = this.selectedEvent!.attendees?.filter(a => a.username !== username);
    //             this.eventRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         runInAction(() => this.loading = false);
    //     }
    // }

    cancelEventToggle = async () => {
        this.loading = true;
        try {
            await agent.Events.attend(this.selectedEvent!.id);
            runInAction(() => {
                this.selectedEvent!.isCancelled = !this.selectedEvent!.isCancelled;
                this.eventRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
                store.userDashboardStore.handleChange(this.selectedEvent!);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    clearSelectedEvent = () => {
        this.selectedEvent = undefined;
    }

    updateAttendeeFollowing = (username: string) => {
        this.eventRegistry.forEach(event => {
            event.attendees?.forEach(attendee => {
                if (attendee.username === username) {
                    attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                    attendee.following = !attendee.following;
                }
            })
        })
    }

    acceptInviteRequest = async (id: string, username: string) => {
        this.loading = true;
        try {
            await agent.Events.acceptInviteRequest(id, username);
            runInAction(() => {
                this.loadEvents();
                store.userDashboardStore.loadEvents();
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    removeInviteRequest = async (id: string, username: string) => {
        this.loading = true;
        try {
            await agent.Events.removeInviteRequest(id, username);
            runInAction(() => {
                this.loadEvents();
                store.userDashboardStore.loadEvents();
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    requestAnInvite = async (id: string | undefined) => {
        this.loading = true;
        try {
            if (id) {
                await agent.Events.requestInvite(id);
                runInAction(() => {
                    let inviteRequest: InviteRequest = {
                        username: store.userStore.user!.username,
                        displayName: store.userStore.user!.displayName,
                        image: store.userStore.user?.image,
                        createdAt: new Date(),
                        //@ts-ignore
                        event: this.getEvent(id)
                    };
                    this.selectedEvent!.inviteRequests?.push(inviteRequest);
                    this.loadEvents();
                    store.userDashboardStore.loadEvents();
                });
            } else toast.error('Problem with request');
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    reportHost = async (id: string) => {
        this.loading = true;
        try {
            await agent.Events.reportHost(id);
            runInAction(() => toast.success('Host reported. Thank you for your feedback!'));
        } catch (error) {
            console.log(error);
            toast.error('Problem reporting host');
        } finally {
            runInAction(() => this.loading = false);
        }
    }
}