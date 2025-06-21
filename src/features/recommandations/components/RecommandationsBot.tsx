"use client";

import { FC, ReactNode, useState, } from "react";
import PromptInput from "./PromptInput";
import { useSession } from "next-auth/react";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { IChatRole, useRecommandation } from "../hooks/useRecommandation";
import { Skeleton } from "@/components/ui/skeleton";
import Markdown from "markdown-to-jsx";
import { useSpeech } from "react-text-to-speech";
import { Button } from "@/components/ui/button";
import { Check, Copy, StopCircle, Volume2 } from "lucide-react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";

type ChatItemProps = {
    role: IChatRole;
    message: string;
    image: ReactNode | string;
    name: string;
}

const ChatItem: FC<ChatItemProps> = ({ image, message, role, name }) => {
    const { start, stop, speechStatus } = useSpeech({ text: message });
    const [copied, setCopied] = useState<boolean>(false);

    const handlePlaySound = () => {
        speechStatus !== "started" ? start() : stop();
    }

    const handleCopyText = () => {
        setCopied(true);
        copy(message);
        toast("Message copié dans le presse-papiers", {
            type: "success",
            position: "top-right",
            autoClose: 3000
        })

        setTimeout(() => {
            setCopied(false);
        }, 3500);
    }

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

                {/* Actions */}
                {
                    role === "bot" && (
                        <div className="chat-content__actions flex items-center space-x-4 ml-2">
                            <Button className="copy-text rounded-full !px-0 cursor-pointer group" variant="ghost" onClick={handleCopyText}>
                                {copied ? (
                                    <Check className="size-4" />
                                ) :
                                    (
                                        <Copy className="size-4 transition-transform duration-300 group-hover:-translate-y-1" />
                                    )
                                }
                            </Button>

                            <Button className="play-sound rounded-full !px-0 cursor-pointer group" variant="ghost" onClick={handlePlaySound}>
                                {speechStatus !== "started" ?
                                    (
                                        <Volume2 className="size-5 transition-transform duration-300 group-hover:-translate-y-1" />
                                    ) : (
                                        <StopCircle className="size-5 animate-pulse text-primary" />
                                    )
                                }
                            </Button>
                        </div>
                    )
                }
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
    const { chats, loading } = useRecommandation();

    if (status === "loading") return <AuthLoadingScreen text="Chargement en cours..." />

    return (
        <div className="recommandations-bot w-[43%] mb-12 relative">
            {chats.length === 0 && (
                <div className="recommandations-bot__header mb-6 flex flex-col gap-4">
                    <h1 className="text-3xl 2xl:text-4xl font-michroma leading-tight">
                        Décrivez votre recherche idéale
                    </h1>
                    <p className="text-foreground/80">Décrivez le produit que vous recherchez et notre IA assitant commercial proposera les meilleures options pour vous.</p>
                </div>
            )}

            <div className="input-container fixed  w-[36%] max-w-full bottom-9 z-10">
                <PromptInput />
            </div>

            {
                chats.length > 0 && (
                    <ScrollArea className="chat-wrapper w-full flex flex-col h-full max-h-[calc(100vh-200px)] scrollable-section overflow-y-auto">
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
                    </ScrollArea>
                )
            }
        </div>
    );
};

export default RecommandationsBot;