"use client";

import { FC, ReactNode, } from "react";
import PromptInput from "./PromptInput";
import { useSession } from "next-auth/react";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useRecommandation } from "../hooks/useRecommandation";
import { Skeleton } from "@/components/ui/skeleton";
import Markdown from "markdown-to-jsx";

type ChatItemProps = {
    role: string;
    message: string;
    image: ReactNode | string;
    name: string;
}

const ChatItem: FC<ChatItemProps> = ({ image, message, role, name }) => {
    return (
        <article className="chat-item flex gap-6 w-full items-start">
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
                        "chat-content__message mt-3 p-3 rounded-lg w-fit",
                        role === "user" ? "bg-blue-500 text-white" : "bg-input/60 dark:bg-[#2B2C2C]"
                    )
                }>
                    <Markdown options={{ forceWrapper: true }} className="text-base">{message}</Markdown>
                </div>
            </div>
        </article>
    );
}

const ChatItemSkeleton = () => {
    return (
        <article className="chat-item-skeleton flex gap-6 w-full items-start">
            <Skeleton className="avatar-skeleton w-12 h-12 rounded-lg" />

            <div className="chat-content-skeleton w-full">
                <Skeleton className="chat-content-skeleton__header h-[20px] w-[20%]" />

                <Skeleton className="chat-content-skeleton__content mt-3 h-[65px] w-full" />
            </div>
        </article>
    );
}

const RecommandationsBot = (): JSX.Element => {
    const { data, status } = useSession();
    const { chats, loading, reset } = useRecommandation();

    if (status === "loading") return <AuthLoadingScreen text="Chargement en cours..." />

    return (
        <div className="recommandations-bot w-[45%] mb-12 relative">
            {chats.length === 0 && (
                <div className="recommandations-bot__header mb-6 flex flex-col gap-4">
                    <h1 className="text-3xl 2xl:text-4xl font-michroma leading-tight">
                        Décrivez votre recherche idéale
                    </h1>
                    <p className="text-foreground/80">Décrivez le produit que vous recherchez et notre IA assitant commercial proposera les meilleures options pour vous.</p>
                </div>
            )}

            <div className="input-container fixed  w-[42%] max-w-full bottom-5 z-10">
                <PromptInput />
            </div>

            {
                chats.length > 0 && (
                    <div className="chat-wrapper w-full flex flex-col h-full max-h-[calc(100vh-200px)] scrollable-section overflow-y-auto">
                        <div className="chat-container flex flex-col w-[96%] space-y-10 mb-[100px]">
                            {
                                chats.map((item, index) => (
                                    <ChatItem
                                        key={index}
                                        role={item.role}
                                        message={item.message}
                                        image={item.role === "user" ? <Avatar email={data?.user?.email!} name={data?.user?.name!} className="!size-12 !rounded-lg object-cover" /> : "/ai-avatar.png"}
                                        name={item.role === "user" ? data?.user?.name?.split(" ")[0]! : "Bazzar AI"}
                                    />
                                ))
                            }

                            {
                                loading && (
                                    <ChatItemSkeleton />
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default RecommandationsBot;