import { makeAutoObservable } from "mobx";

interface LoginDialog {
    open: boolean;
}

export default class LoginDialogStore {
    loginDialog: LoginDialog = {
        open: false
    }

    constructor() {
        makeAutoObservable(this);
    }

    openLoginDialog = () => {
        this.loginDialog.open = true;
    }

    closeLoginDialog = () => {
        this.loginDialog.open = false;
    }
}