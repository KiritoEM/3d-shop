export interface IAdminInfo {
    id: string;
    username: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    adminFacial?: IAdminFacialRecognition | null;
    sessions?: Session[];
}

export interface IAdminFacialRecognition {
    id: string;
    image: string;
    adminId: string;
    isActive: boolean;
    deviceInfo?: string | null;
    createdAt: string;
    updatedAt: string;
    admin?: IAdminInfo;
}

export interface Session {
    id: string;
    adminId: string;
    method: string;
    isActive: boolean;
    deviceInfo?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: string;
    updatedAt: string;
    expiresAt?: string | null;
    admin?: IAdminInfo;
}
