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
        <form method="POST" onSubmit={handleSubmit}>
            <div className="prompt-input w-full rounded-xl mt-14 border border-border h-[120px] dark:bg-[#171819] p-4 flex flex-col items-end justify-between gap-5">
                <input
                    type="text"
                    name="prompt"
                    className="outline-none w-full"
                    autoComplete="off"
                    placeholder="Entrez votre description..."
                />

                <Button
                    type="submit"
                    className="send-btn group rounded-full w-10 h-10 !px-0 !py-0 bg-primary hover:bg-primary/90 transition-all cursor-pointer duration-400"
                >
                    <Image
                        src="/icons/send.svg"
                        width={20}
                        height={20}
                        alt="send-icon"
                        className="transition-transform duration-300 group-hover:rotate-45"
                    />
                </Button>
            </div>
        </form>
    );
};

export default PromptInput;