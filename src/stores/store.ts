import { createContext, useContext } from "react";
import EventStore from "./eventStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import CommonStore from "./commonStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";
import LoginDialogStore from "./loginDialogStore";
import RegisterDialogStore from "./registerDialogStore";
import UserDashboardStore from "./userDashboardStore";
import AdminStore from "./adminStore";

interface Store {
    eventStore: EventStore;
    userStore: UserStore;
    modalStore: ModalStore;
    commonStore: CommonStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
    loginDialogStore: LoginDialogStore;
    registerDialogStore: RegisterDialogStore;
    userDashboardStore: UserDashboardStore;
    adminStore: AdminStore;
}

export const store: Store = {
    eventStore: new EventStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
    loginDialogStore: new LoginDialogStore(),
    registerDialogStore: new RegisterDialogStore(),
    userDashboardStore: new UserDashboardStore(),
    adminStore: new AdminStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
