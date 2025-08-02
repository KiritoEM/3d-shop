"use client";

import { useSession } from "next-auth/react";
import { INextauthSession } from "@/types";
import DotLoadingScreen from "@/components/DotLoadingScreen";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRecommandation } from "../hooks/useRecommandation";
import PromptInput from "./PromptInput";
import ChatItem, { ChatItemSkeleton } from "./ChatItem";

// Section Header
const ChatbotHeader = () => (
    <div className="recommandations-bot__header mb-6 flex flex-col gap-4">
        <h1 className="font-michroma text-3xl leading-tight 2xl:text-4xl">
            Comment puis-je vous aider ?
        </h1>
        <p className="text-foreground/80">
            Décrivez le produit ou service que vous recherchez et notre
            assistant commercial IA vous proposera les meilleures
            recommandations et conseils personnalisés pour répondre à vos
            besoins.
        </p>
    </div>
);

const Chatbot = (): JSX.Element => {
    const { data, status } = useSession();
    const { chats, loading } = useRecommandation();

    if (status === "loading")
        return <DotLoadingScreen text="Chargement en cours..." />;

    return (
        <div className="recommandations-bot relative flex h-full w-full flex-col justify-between gap-6 lg:w-[48%] xl:w-[43%]">
            {chats.length === 0 && <ChatbotHeader />}

            {chats.length > 0 && (
                <ScrollArea className="chat-wrapper border-foreground/45 flex h-[calc(100vh-315px)] w-full flex-col overflow-y-auto rounded-xl border lg:h-[calc(100vh-275px)]">
                    <div className="chat-container mb-2 flex w-[98%] flex-col space-y-10 p-5 lg:mb-4">
                        {chats.map((item, index) => (
                            <ChatItem
                                key={index}
                                role={item.role}
                                message={item.message}
                                image={
                                    item.role === "user" ? (
                                        <div className="user-avatar w-12">
                                            <Avatar
                                                name={data?.user?.name!}
                                                image={data?.user?.image ?? ""}
                                                className=" !size-10 !rounded-lg object-cover md:!size-12"
                                            />
                                        </div>
                                    ) : (
                                        "/ai-avatar.png"
                                    )
                                }
                                name={
                                    item.role === "user"
                                        ? data?.user?.name?.split(" ")[0]!
                                        : "Bazzar AI"
                                }
                            />
                        ))}

                        {/* Handling chat item loading */}
                        {loading && <ChatItemSkeleton />}
                    </div>
                </ScrollArea>
            )}

            <div className="input-container mb-6 flex w-full items-center">
                <PromptInput />
            </div>
        </div>
    );
};

export default Chatbot;
