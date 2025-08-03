import { isDevelopment } from "@/lib/utils";
import { IResponseType } from "@/types";

export const askBot = async (
    message: string,
): Promise<IResponseType<string>> => {
    try {
        const response = await fetch(`/api/bot/bot_recommandation`, {
            method: "POST",
            body: JSON.stringify({ prompt: message }),
        });

        if (!response.ok) {
            throw new Error();
        }

        return {
            status: "success",
            message: "",
            data: (await response.json()).message,
        };
    } catch (error: any) {
        isDevelopment && console.error("Error from AI:", error);
        return {
            status: "error",
            message: "Un erreur s'est produite, veuillez réessayer plus tard.",
        };
    }
};
