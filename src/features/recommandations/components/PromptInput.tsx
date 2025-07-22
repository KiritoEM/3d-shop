"use client";

import Image from "next/image";
import { FC, useState } from "react";
import axios from "axios";
import { isDevelopment } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { INextauthSession } from "@/types";
import { useRecommandation } from "../hooks/useRecommandation";

type PromptInputProps = {
    session: INextauthSession;
};

const PromptInput: FC<PromptInputProps> = ({ session }): JSX.Element => {
    const { setChat, setLoading } = useRecommandation();
    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userMessage = inputValue.trim();
        if (!userMessage) return;

        setChat({ role: "user", message: userMessage });
        setLoading(true);
        setInputValue("");

        try {
            const response = await axios.post(
                `/api/bot_recommandation`,
                {
                    prompt: userMessage,
                },
                {
                    headers: {
                        credentials: "include",
                    },
                },
            );

            setChat({
                role: "bot",
                message: response.data.message,
            });
        } catch (error: any) {
            isDevelopment && console.error("Error from AI:", error);
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
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setInputValue(e.target.value);
                    }}
                    placeholder="Ecrire votre description..."
                />

                <div className="btn-cta flex h-full items-end">
                    <Button
                        type="submit"
                        disabled={inputValue.trim().length === 0}
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
