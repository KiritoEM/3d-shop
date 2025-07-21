import { BellIcon, Sidebar } from "lucide-react";
import { FC } from "react";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useDBSession from "@/hooks/useDBSession";
import { useSidebar } from "@/store/sidebar";
import { IDBSession } from "@/types";
import NavMenuIcon from "../navbars/main-nav/components/MenuIcon";

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
                    className="!size-10 md:!size-11 xl:!size-12"
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

const PanelHeader = (): JSX.Element => {
    const {
        setSidebarState,
        closed,
        isSidebarResponsiveOpen,
        setResponsiveSidebarState,
    } = useSidebar();
    const { isLoading, session } = useDBSession();

    if (isLoading) {
        return <AuthLoadingScreen text="Chargement en cours..." />;
    }

    return (
        <header className="panel-header flex justify-between lg:justify-end xl:justify-between">
            <Button
                className="sidebar-trigger bg-gray hidden !h-12 !rounded-lg !px-5 !py-2 transition-transform duration-100 xl:block hover:[&>svg]:scale-110"
                size="lg"
                variant="secondary"
                onClick={() => setSidebarState(!closed)}
            >
                <Sidebar className="size-5" />
            </Button>

            {/* Menu icon */}
            <NavMenuIcon
                className="![&>svg]:size-4 md:![&>svg]:size-5 !px-3 !py-1 sm:ml-2 md:!px-4 md:!py-2"
                isOpen={isSidebarResponsiveOpen}
                openNav={() =>
                    setResponsiveSidebarState(!isSidebarResponsiveOpen)
                }
            />

            <div className="panel-header__actions relative flex items-center space-x-4 md:space-x-6">
                <Button
                    className="notifications-trigger bg-gray !h-10 !w-10 rounded-full !px-0 !py-0 transition-transform duration-100 md:!h-11 md:!w-11  xl:!h-12 xl:!w-12 hover:[&>svg]:scale-110"
                    size="lg"
                    variant="secondary"
                >
                    <BellIcon className="m-auto size-4 xl:size-5" />
                </Button>

                <hr className="separator bg-muted hidden h-[calc(100%+4px)] w-[1.4px] sm:block" />

                <AdminAccount
                    username={session?.username ?? ""}
                    role={session?.role ?? ""}
                    image={session?.image}
                />
            </div>
        </header>
    );
};

export default PanelHeader;
