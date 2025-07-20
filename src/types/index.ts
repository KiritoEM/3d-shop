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
