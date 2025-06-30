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
                message: response.data.message,
            });
        } catch (error: any) {
            console.error("Error from AI:", error);
            setChat({
                role: "bot",
                message:
                    "Une erreur s'est produite, veuillez réessayer plus tard.",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <form
            method="POST"
            className="mt-0 h-fit w-full"
            onSubmit={handleSubmit}
        >
            <div className="prompt-input border-border flex h-[116px] justify-between gap-4 rounded-xl border p-4 sm:gap-6 dark:bg-[#171819]">
                <textarea
                    name="prompt"
                    className="scrollable-section !h-full w-full resize-none text-sm outline-none md:text-base"
                    autoComplete="off"
                    placeholder="Ecrire votre description..."
                />

                <div className="btn-cta flex h-full items-end">
                    <Button
                        type="submit"
                        className="send-btn bg-primary hover:bg-primary/90 duration-400 group h-9 w-9 cursor-pointer rounded-full !px-0 !py-0 transition-all lg:h-10 lg:w-10"
                    >
                        <Image
                            src="/icons/send.svg"
                            width={20}
                            height={20}
                            alt="send-icon"
                            className="!h-4 !w-4 transition-transform duration-300 group-hover:rotate-45"
                        />
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default PromptInput;
