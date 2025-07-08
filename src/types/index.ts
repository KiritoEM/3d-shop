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
