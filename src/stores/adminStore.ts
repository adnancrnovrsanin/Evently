import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import axios from "axios";
import { Profile } from "../models/profile";
import { toast } from "react-toastify";

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
            const response = await axios.get<Array<Profile>>('http://localhost:5000/api/admin/reportedUsers');
            runInAction(() => {
                this.users = response.data;
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteReportedUser = async (username: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/deleteUser/${username}`);
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