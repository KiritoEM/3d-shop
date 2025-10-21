import { FC } from "react";
import { MoreHorizontalIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CardDropdownProps = {
    showDeleteButton?: boolean;
    onDelete: () => void;
};

const CardDropdown: FC<CardDropdownProps> = ({
    showDeleteButton = true,
    onDelete,
}): JSX.Element => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="absolute right-3 top-3 rounded-full"
                >
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="start">
                {showDeleteButton && (
                    <DropdownMenuItem onClick={onDelete}>
                        <span className="text-destructive hover:text-destructive flex items-center gap-3">
                            <Trash2 className="text-destructive" /> Supprimer le
                            compte
                        </span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CardDropdown;
