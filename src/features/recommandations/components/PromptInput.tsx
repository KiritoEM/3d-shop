"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRecommandation } from "../store/recommandation";
import { askBot } from "../services/botServices";

const PromptInput = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("");
    const { setChat, setLoading } = useRecommandation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userMessage = inputValue.trim();
        if (!userMessage) return;

        setChat({ role: "user", message: userMessage });
        setLoading(true);
        setInputValue("");

        const botResponse = await askBot(userMessage);

        if (botResponse.status === "error") {
            setLoading(false);
            return;
        }

        setChat({
            role: "bot",
            message: botResponse.data ?? "",
        });

        setLoading(false);
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
