"use client";

import { FC, ReactNode, useState, } from "react";
import PromptInput from "./PromptInput";
import { useSession } from "next-auth/react";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";
import { Avatar } from "@/components/ui/avatar";
import { cleanTextForSpeech, cn } from "@/lib/utils";
import { IChatRole, useRecommandation } from "../hooks/useRecommandation";
import { Skeleton } from "@/components/ui/skeleton";
import Markdown from "markdown-to-jsx";
import { useSpeech } from "react-text-to-speech";
import { Button } from "@/components/ui/button";
import { Check, Copy, StopCircle, Volume2 } from "lucide-react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRemark } from "react-remarkify";
import { useSpeechAvatar } from "../hooks/useSpeechAvatar";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type ChatItemProps = {
    role: IChatRole;
    message: string;
    image: ReactNode | string;
    name: string;
}

// Chat card
const ChatItem: FC<ChatItemProps> = ({ image, message, role, name }) => {
    const content = useRemark({ markdown: message, rehypePlugins: [rehypeRaw, rehypeSanitize], remarkPlugins: [remarkGfm], remarkToRehypeOptions: { allowDangerousHtml: true } });
    const { start, stop, speechStatus } = useSpeech({
        text: content,
        highlightText: true,
        showOnlyHighlightedText: false,
        highlightMode: "word",
        voiceURI: "Microsoft Paul - French (France)"
    });
    const [copied, setCopied] = useState<boolean>(false);
    const { setSpeechtext, setAnimation } = useSpeechAvatar();

    const handlePlaySound = () => {
        if (speechStatus !== "started") {
            start();
            setSpeechtext(cleanTextForSpeech(message));
            setAnimation("Talking");
        }
        else {
            stop();
            setSpeechtext("");
            setAnimation("Idle");
        }
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
        <article className="chat-item flex gap-4 md:gap-6 w-full items-start">
            {
                typeof image === "string" ? (
                    <img src={image} alt="avatar" className="w-10 md:w-12 h-10 md:h-12 rounded-lg object-cover" />
                ) : (
                    image
                )
            }

            <div className="chat-content">
                <div className="chat-content__header flex items-center gap-6 justify-between">
                    <span className="text-xs sm:text-sm font-semibold font-michroma">{name}</span>
                </div>

                <div className={
                    cn(
                        "chat-content__message mt-3 p-3 rounded-lg w-fit",
                        role === "user" ? "bg-blue-500 text-white" : "bg-input/60 dark:bg-[#2B2C2C]"
                    )
                }>
                    <Markdown options={{ forceWrapper: true }} className="text-sm md:text-base w-fit">{message}</Markdown>
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

// Chat skeleton card
const ChatItemSkeleton = () => {
    return (
        <article className="chat-item-skeleton flex gap-6 w-full items-start">
            <Skeleton className="avatar-skeleton w-10 md:w-12 h-10 md:h-12 rounded-lg" />

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
        <div className="recommandations-bot relative w-full lg:w-[48%] xl:w-[43%] flex flex-col justify-between gap-6 h-full">
            {chats.length === 0 && (
                <div className="recommandations-bot__header mb-6 flex flex-col gap-4">
                    <h1 className="text-3xl 2xl:text-4xl font-michroma leading-tight">
                        Comment puis-je vous aider ?
                    </h1>
                    <p className="text-foreground/80">Décrivez le produit ou service que vous recherchez et notre assistant commercial IA vous proposera les meilleures recommandations et conseils personnalisés pour répondre à vos besoins.</p>
                </div>
            )}

            {
                chats.length > 0 && (
                    <ScrollArea className="chat-wrapper w-full flex flex-col scrollable-section overflow-y-auto rounded-xl border border-foreground/45 h-[calc(100vh-315px)] lg:h-[calc(100vh-275px)]">
                        <div className="chat-container  mb-2 lg:mb-4 flex flex-col w-[98%] space-y-10 p-5">
                            {
                                chats.map((item, index) => (
                                    <ChatItem
                                        key={index}
                                        role={item.role}
                                        message={item.message}
                                        image={item.role === "user" ? (
                                            <div className="user-avatar w-12">
                                                <Avatar email={data?.user?.email!} name={data?.user?.name!} className=" !size-10 md:!size-12 !rounded-lg object-cover" />
                                            </div>
                                        ) : "/ai-avatar.png"}
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

            <div className="input-container w-full flex items-center mb-6">
                <PromptInput />
            </div>
        </div>
    );
};

export default RecommandationsBot;