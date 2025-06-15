import { cn } from "@/lib/utils";
import { FC } from "react";
import ReactAvatar from "react-avatar";

type AvatarProps = {
    name?: string;
    email?: string;
    onClick?: () => void;
    className?: string;
}

const Avatar: FC<AvatarProps> = ({ name, email, onClick, className }) => {
    return (
        <ReactAvatar
            round
            textMarginRatio={.18}
            name={name}
            email={email}
            maxInitials={2}
            title={name}
            size="2.16em"
            className={
                cn(className, "cursor-pointer ml-1")
            }
            onClick={onClick}
        />
    )
}

export { Avatar }