import { makeAutoObservable, runInAction } from "mobx";
import { GoogleAuthDto, User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { ResetPasswordDto } from "../models/resetPasswordDto";

export default class UserStore {
    user: User | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    googleAuth = async () => {
        this.loading = true;
        const provider = new GoogleAuthProvider();
        try {
            const provera = "ya29.a0AVvZVsqkXL_FxtwR_I4q-rA5ezE8p4wDYwSyBlPW6c7azZPLrjznjf_1ZiG5jHu38mbdJ1qfSHzZxRvRxcup7eEcXLfe_KoIoaL6KOF-xgbW9wP2-_MxJfuyyUXeLQoT7CsiBxW8DgWlEQMMf3M_QoEedsiEaCgYKAdgSARMSFQGbdwaIhzeLiJNylsAWxYcMtW6ZCQ0163"
            const googleAuthResult = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(googleAuthResult);
            const token = credential?.accessToken;
            const user = googleAuthResult.user;
            const dto: GoogleAuthDto = {
                email: user?.email,
                displayName: user?.displayName,
                username: user?.email?.split("@")[0],
                googleId: user?.uid,
            }

            const userResult = await agent.Account.googleAuth(dto);
            store.commonStore.setToken(userResult.token);
            runInAction(() => {
                this.loading = false;
                this.user = userResult;
                store.loginDialogStore.closeLoginDialog();
                store.registerDialogStore.closeRegisterDialog();
                this.getUser();
                if (this.user) store.profileStore.loadProfile(this.user.username);
                router.navigate('/');
            });
        } catch (error) {
            runInAction(() => this.loading = false);
            throw error;
        }
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
                router.navigate('/');
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
        store.userDashboardStore.eventRegistry.clear();
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

    requestPasswordReset = async (email: string) => {
        try {
            await agent.Account.requestPasswordReset(email);
            toast.success("Check your email for the reset link");
        } catch (error) {
            throw error;
        }
    }

    resetPassword = async (email: string, token: string, password: string, confirmPassword: string) => {
        this.loading = true;
        try {
            const dto: ResetPasswordDto = {
                email: email,
                token: token,
                password: password,
                confirmPassword: confirmPassword
            };
            await agent.Account.resetPassword(dto);
            toast.success("Password reset successfully");
            runInAction(() => {
                this.loading = false;
                this.user = null;
                store.commonStore.setToken(null);
                router.navigate('/');
            });
        } catch (error) {
            runInAction(() => this.loading = false);
            throw error;
        }
    }
}