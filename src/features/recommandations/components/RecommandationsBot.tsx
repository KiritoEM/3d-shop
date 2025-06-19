"use client";

import { FC, ReactNode, useState } from "react";
import PromptInput from "./PromptInput";
import { useSession } from "next-auth/react";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ChatItemProps = {
    role: string;
    message: string;
    image: ReactNode | string;
    name: string;
}

const ChatItem: FC<ChatItemProps> = ({ image, message, role, name }) => {
    return (
        <article className="chat-item flex gap-6">
            {
                typeof image === "string" ? (
                    <img src={image} alt="avatar" className="w-12 h-12 rounded-lg object-cover" />
                ) : (
                    image
                )
            }

            <div className="chat-content">
                <div className="chat-content__header flex items-center gap-6 justify-between">
                    <span className="text-sm font-semibold font-michroma">{name}</span>
                </div>

                <div className={
                    cn(
                        "chat-content__message mt-3 p-3 rounded-lg",
                        role === "user" ? "chat-linear" : "bg-[#2B2C2C]"
                    )
                }>
                    <p className="text-base">{message}</p>
                </div>
            </div>
        </article>
    );
}

export type IChat = {
    role: string;
    message: string;
}

const RecommandationsBot = (): JSX.Element => {
    const [chat, setChat] = useState<IChat[]>([]);
    const { data, status } = useSession();

    if (status === "loading") return <AuthLoadingScreen />

    return (
        <div className="recommandations-bot w-[46%]">
            <div className="recommandations-bot__header mb-6 flex flex-col gap-4">
                <h1 className="text-3xl 2xl:text-4xl font-michroma leading-tight">
                    Décrivez votre recherche idéale
                </h1>
                <p className="text-foreground/80">Décrivez le produit que vous recherchez et notre IA trouvera les meilleures options pour vous.</p>
            </div>

            {
                chat.length > 0 ? (
                    <div className="chat-container flex flex-col space-y-8 mt-14">
                        {
                            chat.map((item, index) => (
                                <ChatItem
                                    key={index}
                                    role={item.role}
                                    message={item.message}
                                    image={item.role === "user" ? <Avatar email={data?.user?.email!} name={data?.user?.name!} className="!size-12 !rounded-lg object-cover" /> : "/images/bot-avatar.png"}
                                    name={item.role === "user" ? data?.user?.name?.split(" ")[0]! : "Bazzar AI"}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <PromptInput onSubmit={(value: IChat) => setChat((prev) => [...prev, value])} />
                )
            }
        </div>
    );
};

export default RecommandationsBot;