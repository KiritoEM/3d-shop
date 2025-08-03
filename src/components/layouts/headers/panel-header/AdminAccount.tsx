import { FC } from "react";
import { IDBSession } from "@/types";
import { Avatar } from "@/components/ui/avatar";

type AdminAccountProps = Omit<IDBSession, "id" | "role"> & {
    role: string;
};

const AdminAccount: FC<AdminAccountProps> = ({
    role,
    username,
    image,
}): JSX.Element => {
    return (
        <div className="admin-account flex items-center space-x-4">
            <div className="admin-account__avatar relative cursor-pointer">
                <Avatar
                    name={username}
                    image={image}
                    className="!size-10 md:!size-11"
                />
            </div>

            <div className="admin-account__info hidden sm:block">
                <h6 className="font-michroma line-clamp-1 max-w-[190px] text-ellipsis text-base">
                    {username}
                </h6>
                <p className="text-muted-foreground mt-[2px] text-xs xl:text-sm">
                    {role}
                </p>
            </div>
        </div>
    );
};
export default AdminAccount;
