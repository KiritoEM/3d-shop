import { cn } from "@/lib/utils";
import { FC } from "react";
import ReactAvatar from "react-avatar";

type AvatarProps = {
    name?: string;
    email?: string;
    onClick?: () => void;
    className?: string;
    image?: string;
};

const Avatar: FC<AvatarProps> = ({
    name,
    email,
    onClick,
    image,
    className,
}) => {
    return (
        <ReactAvatar
            round
            textMarginRatio={0.18}
            name={name}
            email={email}
            maxInitials={2}
            title={name}
            className={cn(className, "cursor-pointer")}
            onClick={onClick}
            src={typeof image === "string" ? image : undefined}
        />
    );
};

export { Avatar };
