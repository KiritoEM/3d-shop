"use client";

import { FC } from "react";
import ReactAvatar from "react-avatar";
import { cn } from "@/lib/utils";

type AvatarProps = {
    className?: string;
    image?: string;
    name?: string;
    onClick?: () => void;
};

const Avatar: FC<AvatarProps> = ({ name, onClick, image, className }) => {
    return (
        <ReactAvatar
            round
            textMarginRatio={0.18}
            name={name}
            maxInitials={2}
            title={name}
            className={cn(className, "cursor-pointer !object-cover")}
            onClick={onClick}
            src={image}
            alt={name ? `Avatar de ${name}` : "Avatar utilisateur"}
        />
    );
};

export { Avatar };
