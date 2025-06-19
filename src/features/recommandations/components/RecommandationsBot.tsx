"use client";

import { FC, ReactNode, } from "react";
import PromptInput from "./PromptInput";
import { useSession } from "next-auth/react";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useRecommandation } from "../hooks/useRecommandation";
import { Skeleton } from "@/components/ui/skeleton";

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
                        role === "user" ? "chat-linear" : "bg-[#2B2C2C]"
                    )
                }>
                    <p className="text-base">{message}</p>
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
        <div className="recommandations-bot w-[46%] mb-12">
            <div className="recommandations-bot__header mb-6 flex flex-col gap-4">
                <h1 className="text-3xl 2xl:text-4xl font-michroma leading-tight">
                    Décrivez votre recherche idéale
                </h1>
                <p className="text-foreground/80">Décrivez le produit que vous recherchez et notre IA trouvera les meilleures options pour vous.</p>
            </div>

            {
                chats.length > 0 ? (
                    <div className="chat-wrapper w-full flex flex-col">
                        <div className="chat-container flex flex-col space-y-10 mt-14">
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

                        {
                            !loading && (
                                <div className="reset-btn w-full flex justify-center">
                                    <Button className="rounded-full mt-8" onClick={reset}><RotateCcw /> Effectuer une autre demande</Button>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <PromptInput />
                )
            }
        </div>
    );
};

export default RecommandationsBot;