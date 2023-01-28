import { IEvent } from "./event";

export interface InviteRequest {
    username: string;
    displayName: string;
    image?: string;
    createdAt: Date;
    event: IEvent;
}