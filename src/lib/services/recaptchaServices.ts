import { isDevelopment } from "@/lib/utils";
import { IResponseType } from "@/types";

export const verifyRecaptcha = async (
    captchaValue: string,
): Promise<IResponseType<null> | void> => {
    try {
        if (!captchaValue) {
            return {
                status: "error",
                message: "Veuillez valider le ReCAPTCHA",
            };
        }

        const response = await fetch("/api/verify_recaptcha", {
            method: "POST",
            body: JSON.stringify({ captchaValue }),
            headers: {
                "content-type": "application/json",
            },
        });

        if (!response.ok) {
            return {
                status: "error",
                message:
                    "Un erreur s'est produit lors de la vérification ReCAPTCHA",
            };
        }

        const serverData = await response.json();

        if (!serverData.data.success) {
            return {
                status: "error",
                message:
                    "Un erreur s'est produit lors de la vérification ReCAPTCHA",
            };
        }

        return {
            status: "success",
            message: "ReCAPTCHA validé avec succés",
        };
    } catch (err) {
        isDevelopment && console.error(err);
        return {
            status: "error",
            message: "Un erreur s'est produit",
        };
    }
};
