export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}

export interface GoogleAuthDto {
    email: string | null;
    displayName: string | null;
    username: string | undefined;
    googleId: string | null;
}