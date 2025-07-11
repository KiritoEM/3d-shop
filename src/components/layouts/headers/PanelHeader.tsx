import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useSidebar from "@/hooks/useSidebar";
import { BellIcon, Sidebar } from "lucide-react";

const AdminAccount = (): JSX.Element => {
    return (
        <div className="admin-account flex items-center space-x-4">
            <div className="admin-account__avatar relative cursor-pointer">
                <Avatar name="Admin_056" className="!size-12" />

                {/* <div className="chevron bg-foreground absolute -bottom-[1.8px] -right-[3px] rounded-full">
                    <ChevronDown className=" text-background m-auto size-[18px]" />
                </div> */}
            </div>

            <div className="admin-account__info">
                <h6 className="font-michroma text-base">admin_bazzar_056</h6>
                <p className="text-muted-foreground mt-[2px] text-sm">
                    Superadmin
                </p>
            </div>
        </div>
    );
};

const PanelHeader = (): JSX.Element => {
    const { setSidebarState, closed } = useSidebar();
    return (
        <header className="panel-header flex justify-between">
            <Button
                className="sidebar-trigger bg-gray !h-12 !rounded-lg !px-5 !py-2 transition-transform duration-100 hover:[&>svg]:scale-110"
                size="lg"
                variant="secondary"
                onClick={() => setSidebarState(!closed)}
            >
                <Sidebar className="size-5" />
            </Button>

            <div className="panel-header__actions relative flex items-center space-x-6">
                <Button
                    className="notifications-trigger bg-gray !h-12 !w-12 rounded-full !px-0 !py-0  transition-transform duration-100 hover:[&>svg]:scale-110"
                    size="lg"
                    variant="secondary"
                >
                    <BellIcon className="m-auto size-5" />
                </Button>

                <hr className="separator bg-muted h-[calc(100%+4px)] w-[1.4px]" />

                <AdminAccount />
            </div>
        </header>
    );
};

export default PanelHeader;
