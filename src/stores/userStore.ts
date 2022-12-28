import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import { useNavigate } from "react-router-dom";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
                store.loginDialogStore.closeLoginDialog();
                this.getUser();
                if (this.user) store.profileStore.loadProfile(this.user.username);
            });
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            await agent.Account.register(creds);
            store.registerDialogStore.closeRegisterDialog();
            router.navigate(`/account/registerSuccess?email=${creds.email}`);
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        store.eventStore.eventRegistry.clear();
        store.eventStore.usersEvents = [];
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    setImage = (image: string) => {
        if (this.user) this.user.image = image;
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }

    setUserPhoto = (url: string) => {
        if (this.user) this.user.image = url;
    }
}