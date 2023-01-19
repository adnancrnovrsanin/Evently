import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import axios from "axios";
import { Profile } from "../models/profile";
import { toast } from "react-toastify";
import agent from "../api/agent";

export default class AdminStore {
    users: Array<Profile> = [];

    constructor() {
        makeAutoObservable(this);
    }

    get isAdmin () {
        return store.userStore.user?.username === 'admin';
    }

    getReportedUsers = async () => {
        try {
            const response = await agent.Admin.getReportedUsers();
            runInAction(() => {
                this.users = response.data;
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteReportedUser = async (username: string) => {
        try {
            await agent.Admin.deleteReportedUser(username);
            runInAction(() => {
                this.users = this.users.filter(user => user.username !== username);
                toast.success('User deleted successfully');
            })
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
}