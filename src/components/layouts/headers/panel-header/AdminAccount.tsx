import { FC, Fragment } from "react";
import { IDBSession } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type AdminAccountProps = Omit<IDBSession, "id" | "role"> & {
    role: string;
    isLoadingSession?: boolean;
};

const AdminAccount: FC<AdminAccountProps> = ({
    role,
    username,
    image,
    isLoadingSession,
}): JSX.Element => {
    return (
        <div className="admin-account flex items-center space-x-4">
            {isLoadingSession ? (
                //Loading skeleton
                <Fragment>
                    <Skeleton className="h-10 w-10 rounded-full" />

                    <div className="hidden sm:block">
                        <Skeleton className="h-3 w-[150px]" />
                        <Skeleton className="mt-2 h-3 w-[100px]" />
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <div className="admin-account__avatar relative cursor-pointer">
                        <Avatar
                            name={username}
                            image={image}
                            className="!size-10 md:!size-11"
                        />
                    </div>

                    <div className="admin-account__info hidden sm:block">
                        <h6 className="font-michroma line-clamp-1 max-w-[175px] text-ellipsis text-base">
                            {username}
                        </h6>
                        <p className="text-muted-foreground mt-[2px] text-xs xl:text-sm">
                            {role}
                        </p>
                    </div>
                </Fragment>
            )}
        </div>
    );
};
export default AdminAccount;
