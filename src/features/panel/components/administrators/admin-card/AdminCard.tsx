"use client";

import { FC, useTransition } from "react";
import { toast } from "react-toastify";
import { IAdminInfo } from "@/models/adminModel";
import DotLoadingScreen from "@/components/DotLoadingScreen";
import { deleteAdminById } from "../../../actions/adminActions";
import CardDropdown from "./CardDropdown";
import useDBSession from "@/hooks/useDBSession";

type AdminCardProps = Omit<IAdminInfo, "password" | "updatedAt" | "sessions">;

const AdminCard: FC<AdminCardProps> = ({
    id,
    role,
    username,
    createdAt,
    adminFacial,
}): JSX.Element => {
    const [isPending, startTransition] = useTransition();
    const { session } = useDBSession();

    const handleDeleteAdmin = (id: string) => {
        startTransition(async () => {
            const response = await deleteAdminById(id);

            toast(response.message, {
                type: response.status === "error" ? "error" : "success",
                theme: "colored",
            });
        });
    };

    if (isPending) {
        return <DotLoadingScreen text="Suppresion de l'admin..." />;
    }

    return (
        <article className="admin-card relative flex w-full flex-col items-center gap-4 rounded-lg border p-4 sm:gap-8 sm:p-4 md:flex-row xl:gap-6 dark:bg-[#242426]">
            {/* More button */}
            {session?.adminId! !== id && (
                <CardDropdown
                    showDeleteButton={session?.adminId !== id}
                    onDelete={() => handleDeleteAdmin(id)}
                />
            )}

            <div className="admin-card__image aspect-[4/3] max-h-[184px] w-full overflow-hidden rounded-xl md:!h-20 md:!w-20 md:flex-shrink-0 lg:!h-[100px] lg:!w-[100px] 2xl:!h-28 2xl:!w-28">
                <img
                    src={
                        adminFacial?.image
                            ? adminFacial?.image
                            : "/default-avatar.webp"
                    }
                    className="h-full w-full object-cover object-center"
                    alt="admin-avatar"
                />
            </div>
            <div className="card-info flex w-full min-w-0 flex-col justify-center gap-2">
                <div className="card-info__badge bg-gray dark:bg-background m-0 w-max rounded-full px-3 py-1 text-xs sm:py-2 sm:text-[15px]">
                    <p className="truncate">{role.toLowerCase()}</p>
                </div>
                <h6 className="card-info__admin-name line-clamp-2 overflow-ellipsis text-lg font-medium leading-tight lg:text-xl xl:text-lg">
                    {username}
                </h6>
                <p className="card-info__date text-muted-foreground mt-0.5 break-words text-sm leading-tight sm:text-base">
                    créé le {new Date(createdAt).toLocaleDateString()}
                </p>
            </div>
        </article>
    );
};

export default AdminCard;
