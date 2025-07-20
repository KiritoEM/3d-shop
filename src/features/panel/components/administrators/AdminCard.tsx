"use client";

import { MoreHorizontalIcon, Trash2 } from "lucide-react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAdminInfo } from "@/models/adminModel";
import { deleteAdminById } from "../../actions/adminActions";
import { toast } from "react-toastify";

type AdminCardFlexibleProps = Omit<
    IAdminInfo,
    "password" | "updatedAt" | "sessions"
>;

const AdminCardFlexible: FC<AdminCardFlexibleProps> = ({
    id,
    role,
    username,
    createdAt,
    adminFacial,
}): JSX.Element => {
    const deleteAdmin = async (id: string) => {
        const response = await deleteAdminById(id);

        toast(response.message, {
            type: response.status === "error" ? "error" : "success",
            theme: "colored",
        });
    };

    return (
        <article className="admin-card relative flex w-full flex-col items-center gap-4 rounded-lg border bg-[#2e3033] p-4 sm:gap-8 sm:p-4 md:flex-row xl:gap-6">
            {/* More button */}
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
                    <DropdownMenuItem onClick={() => deleteAdmin(id)}>
                        <span className="text-destructive hover:text-destructive flex items-center gap-3">
                            <Trash2 className="text-destructive" /> Supprimer le
                            compte
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="aspect-[4/3] max-h-[184px] w-full overflow-hidden rounded-xl md:!h-20 md:!w-20 md:flex-shrink-0 lg:!h-[100px] lg:!w-[100px] 2xl:!h-28 2xl:!w-28">
                <img
                    src={
                        adminFacial?.image
                            ? adminFacial?.image
                            : "/default-avatar.webp"
                    }
                    className="object-cover object-center"
                    alt="admin-avatar"
                />
            </div>
            <div className="card-info flex w-full min-w-0 flex-col justify-center gap-2">
                <div className="card-info__badge bg-gray m-0 w-max rounded-full px-3 py-1 text-xs sm:py-2 sm:text-[15px]">
                    <p className="truncate">{role.toLowerCase()}</p>
                </div>
                <h6 className="card-info__admin-name line-clamp-2 overflow-ellipsis text-lg font-medium leading-tight lg:text-xl xl:text-lg 2xl:text-xl">
                    {username}
                </h6>
                <p className="card-info__date text-muted-foreground mt-1 break-words text-sm leading-tight sm:text-base">
                    créé le {new Date(createdAt).toLocaleDateString()}
                </p>
            </div>
        </article>
    );
};

export default AdminCardFlexible;
