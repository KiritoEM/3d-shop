"use client";

import { Button } from "@/components/ui/button";
import { FLASK_BASE_URL } from "@/constants/constants";
import Image from "next/image";
import { FC } from "react";
import axios from "axios";
import { IChat } from "./RecommandationsBot";

type PromptInputProps = {
    onSubmit?: (value: IChat) => void;
}

const PromptInput: FC<PromptInputProps> = ({ onSubmit }): JSX.Element => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const input = form["prompt"] as HTMLInputElement;

        onSubmit?.({ role: "user", message: input.value.trim() });

        const response = await axios.post(
            `${FLASK_BASE_URL}/bot/recommandation`,
            {
                prompt: input.value.trim(),
            }
        );

        if (response.status !== 200) {
            onSubmit?.({ role: "bot", message: "Une erreur s'est produite lors de la soumission du prompt." });
            console.error("Failed to submit prompt:", response.data.error);
        }

        onSubmit?.({ role: "bot", message: response.data.explanation });

    }
    return (
        <form method="POST" onSubmit={handleSubmit}>
            <div className="prompt-input w-full rounded-xl mt-14 border border-border h-[150px] dark:bg-[#171819] p-4 flex flex-col items-end justify-between gap-5">
                <input
                    type="text"
                    name="prompt"
                    className="outline-none w-full"
                    autoComplete="off"
                    placeholder="Entrez votre description... (ex: ‘une montre apple watch’)"
                />

                <Button type="submit" className="send-btn rounded-full w-10 h-10 !px-0 !py-0 bg-primary hover:bg-primary/90 transition-all cursor-pointer duration-400">
                    <Image
                        src="/icons/send.svg"
                        width={20}
                        height={20}
                        alt="send-icon"
                        className="transition-transform duration-300 group-hover:rotate-280"
                    />
                </Button>
            </div>
        </form>
    );
};

export default PromptInput;