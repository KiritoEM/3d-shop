
"use client";

import { Button } from "@/components/ui/button";
import { FLASK_BASE_URL } from "@/constants/constants";
import Image from "next/image";
import { FC } from "react";
import axios from "axios";
import { useRecommandation } from "../hooks/useRecommandation";

const PromptInput: FC = (): JSX.Element => {
    const { setChat, setLoading } = useRecommandation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const input = form["prompt"] as HTMLInputElement;
        const userMessage = input.value.trim();

        if (!userMessage) return;

        setChat({ role: "user", message: userMessage });
        setLoading(true);
        input.value = "";

        try {
            const response = await axios.post(`/api/bot_recommandation`, {
                prompt: userMessage,
            });

            setChat({
                role: "bot",
                message: response.data.message
            });
        } catch (error: any) {
            console.error("Error from AI:", error);
            setChat({
                role: "bot",
                message: "Une erreur s'est produite, veuillez réessayer plus tard."
            });
        } finally {
            setLoading(false);
        }
    }
    return (
        <form method="POST" className="w-full h-fit mt-0" onSubmit={handleSubmit}>
            <div className="prompt-input rounded-xl border border-border h-[116px] dark:bg-[#171819] p-4 flex justify-between gap-4 sm:gap-6">
                <textarea
                    name="prompt"
                    className="outline-none w-full !h-full resize-none scrollable-section text-sm md:text-base"
                    autoComplete="off"
                    placeholder="Ecrire votre description..."
                />

                <div className="btn-cta h-full flex items-end">
                    <Button
                        type="submit"
                        className="send-btn group rounded-full w-9 lg:w-10 h-9 lg:h-10 !px-0 !py-0 bg-primary hover:bg-primary/90 transition-all cursor-pointer duration-400"
                    >
                        <Image
                            src="/icons/send.svg"
                            width={20}
                            height={20}
                            alt="send-icon"
                            className="!w-4 !h-4 transition-transform duration-300 group-hover:rotate-45"
                        />
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default PromptInput;
