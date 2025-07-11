export interface IUser {
    id: string;
    email: string;
    name: string;
    password: string;
    emailVerified?: string | null;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
}
