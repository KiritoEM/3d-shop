import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_NAME = process.env.SMTP_NAME;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_SERVICE = process.env.SMTP_SERVICE;

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    service: SMTP_SERVICE,
    port: 465,
    secure: true,
    debug: true,
    connectionTimeout: 10000,
    auth: {
        user: SMTP_NAME as string,
        pass: SMTP_PASSWORD as string,
    },
});

type sendEmailOptions = {
    from: string;
    to: string;
    subject: string;
    html?: string;
};

const sendEmail = async (options: sendEmailOptions) => {
    try {
        await transporter.verify();
    } catch (err) {
        throw new Error(
            `Something wrong while verifying transporter, err:  ${err}`,
        );
    }

    return await transporter.sendMail(options);
};

export default {
    sendEmail,
};
