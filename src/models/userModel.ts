export interface IUser {
    id: string;
    email: string;
    name: string;
    password: string;
    emailVerified?: string | null;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
    accounts: IAccount[];
}

interface IAccount {
    type: string;
    provider: string;
    providerAccountId: string;
    expires_at: string;
    session_state: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserStats {
    month: string;
    count: number;
}
