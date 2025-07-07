"use server";

import { render, pretty } from "@react-email/render";
import SendOTPTemplate from "@/components/email-templates/SendOTPTemplate";
import { EmailTemplateProps, EmailTemplateType, IResponseType } from "@/types";
import nodemailer from "@/lib/nodemailer";
import { isDevelopment } from "@/lib/utils";

const FROM_EMAIL = process.env.FROM_EMAIL;

export const sendEmail = async <T extends EmailTemplateType>(
    to: string,
    subject: string,
    templateType: T,
    templateProps: EmailTemplateProps[T],
): Promise<IResponseType<any>> => {
    try {
        const emailHtml = async () => {
            switch (templateType) {
                case "sendOTP":
                    return await pretty(
                        await render(<SendOTPTemplate {...templateProps} />),
                    );

                default:
                    break;
            }
        };

        await nodemailer.sendEmail({
            from: FROM_EMAIL as string,
            to,
            subject,
            html: await emailHtml(),
        });

        return {
            status: "success",
            message: "Email envoyé, vérifiez votre boîte email !!!",
        };
    } catch (err) {
        isDevelopment && console.error(err);
        return {
            status: "error",
            message: "Un erreur s'est produit",
        };
    }
};
