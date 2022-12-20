import { createContext, useContext } from "react";
import EventStore from "./eventStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import CommonStore from "./commonStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";
import LoginDialogStore from "./loginDialogStore";
import RegisterDialogStore from "./registerDialogStore";

interface Store {
    eventStore: EventStore;
    userStore: UserStore;
    modalStore: ModalStore;
    commonStore: CommonStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
    loginDialogStore: LoginDialogStore;
    registerDialogStore: RegisterDialogStore;
}

export const store: Store = {
    eventStore: new EventStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
    loginDialogStore: new LoginDialogStore(),
    registerDialogStore: new RegisterDialogStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
