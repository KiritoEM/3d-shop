import { Session as NextauthSession } from "next-auth";
import { NextRequest } from "next/server";
import { AdminFacialRecognition, AdminInfo, Session } from "@prisma/client";

export type IResponseType<T = null> = {
    message: string;
    status: "success" | "error";
    data?: T;
};

export type EmailTemplateType = "sendOTP";

export interface OTPEmailProps {
    validationCode: string;
}

export interface EmailTemplateProps {
    sendOTP: OTPEmailProps;
}

export type IDBSession = Pick<AdminInfo, "id" | "username" | "role"> & {
    image?: string;
    expires?: Date;
};

export type SessionwithFacial = Session & {
    admin: AdminInfo & {
        adminFacial: AdminFacialRecognition | null;
    };
};

export type IfileType = "IMAGE" | "VIDEO";

export type INextauthSession = NextauthSession["user"] & {
    id: string;
    accessToken?: string;
};

export interface NextRequestWithId extends NextRequest {
    userId?: string;
}

export interface IPagination {
    take?: number;
    skip: number;
}
