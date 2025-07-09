import { transporter } from "./config";

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
