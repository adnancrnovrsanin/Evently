import { makeAutoObservable } from "mobx";

interface RegisterDialog {
    open: boolean;
}

export default class RegisterDialogStore {
    registerDialog: RegisterDialog = {
        open: false
    }

    constructor() {
        makeAutoObservable(this);
    }

    openRegisterDialog = () => {
        this.registerDialog.open = true;
    }

    closeRegisterDialog = () => {
        this.registerDialog.open = false;
    }
}