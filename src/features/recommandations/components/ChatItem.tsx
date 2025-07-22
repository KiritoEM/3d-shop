import { FC, ReactNode, useState } from "react";
import { useRemark } from "react-remarkify";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { useSpeech } from "react-text-to-speech";
import Markdown from "markdown-to-jsx";
import { Check, Copy, StopCircle, Volume2 } from "lucide-react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { cleanTextForSpeech, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSpeechAvatar } from "../hooks/useSpeechAvatar";
import { IChatRole } from "../hooks/useRecommandation";

type ChatItemProps = {
    role: IChatRole;
    message: string;
    image: ReactNode | string;
    name: string;
};

// Chat card
const ChatItem: FC<ChatItemProps> = ({ image, message, role, name }) => {
    const content = useRemark({
        markdown: message,
        rehypePlugins: [rehypeRaw, rehypeSanitize],
        remarkPlugins: [remarkGfm],
        remarkToRehypeOptions: { allowDangerousHtml: true },
    });
    const { start, stop, speechStatus } = useSpeech({
        text: content,
        highlightText: true,
        showOnlyHighlightedText: false,
        highlightMode: "word",
        voiceURI: "Microsoft Paul - French (France)",
    });
    const [copied, setCopied] = useState<boolean>(false);
    const { setSpeechtext, setAnimation } = useSpeechAvatar();

    const handlePlaySound = () => {
        if (speechStatus !== "started") {
            start();
            setSpeechtext(cleanTextForSpeech(message));
            setAnimation("Talking");
        } else {
            stop();
            setSpeechtext("");
            setAnimation("Idle");
        }
    };

    const handleCopyText = () => {
        setCopied(true);
        copy(message);
        toast("Message copié dans le presse-papiers", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
        });

        setTimeout(() => {
            setCopied(false);
        }, 3500);
    };

    return (
        <article className="chat-item flex w-full items-start gap-4 md:gap-6">
            {typeof image === "string" ? (
                <img
                    src={image}
                    alt="avatar"
                    className="h-10 w-10 rounded-lg object-cover md:h-12 md:w-12"
                />
            ) : (
                image
            )}

            <div className="chat-content">
                <div className="chat-content__header flex items-center justify-between gap-6">
                    <span className="font-michroma text-xs font-semibold sm:text-sm">
                        {name}
                    </span>
                </div>

                <div
                    className={cn(
                        "chat-content__message mt-3 w-fit rounded-lg p-3",
                        role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-input/60 dark:bg-[#2B2C2C]",
                    )}
                >
                    <Markdown
                        options={{ forceWrapper: true }}
                        className="w-fit text-sm md:text-base"
                    >
                        {message}
                    </Markdown>
                </div>

                {/* Actions */}
                {role === "bot" && (
                    <div className="chat-content__actions ml-2 flex items-center space-x-4">
                        <Button
                            className="copy-text group cursor-pointer rounded-full !px-0"
                            variant="ghost"
                            onClick={handleCopyText}
                        >
                            {copied ? (
                                <Check className="size-4" />
                            ) : (
                                <Copy className="size-4 transition-transform duration-300 group-hover:-translate-y-1" />
                            )}
                        </Button>

                        <Button
                            className="play-sound group cursor-pointer rounded-full !px-0"
                            variant="ghost"
                            onClick={handlePlaySound}
                        >
                            {speechStatus !== "started" ? (
                                <Volume2 className="size-5 transition-transform duration-300 group-hover:-translate-y-1" />
                            ) : (
                                <StopCircle className="text-primary size-5 animate-pulse" />
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </article>
    );
};

// Chat skeleton card
export const ChatItemSkeleton = () => {
    return (
        <article className="chat-item-skeleton flex w-full items-start gap-6">
            <Skeleton className="avatar-skeleton h-10 w-10 rounded-lg md:h-12 md:w-12" />

            <div className="chat-content-skeleton w-full">
                <Skeleton className="chat-content-skeleton__header h-[20px] w-[20%]" />

                <Skeleton className="chat-content-skeleton__content mt-3 h-[65px] w-full" />
            </div>
        </article>
    );
};

export default ChatItem;
