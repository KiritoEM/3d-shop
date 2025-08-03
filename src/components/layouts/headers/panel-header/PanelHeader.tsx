import { BellIcon, Moon, Sidebar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import DotLoadingScreen from "@/components/DotLoadingScreen";
import { Button } from "@/components/ui/button";
import useDBSession from "@/hooks/useDBSession";
import { useSidebar } from "@/store/sidebar";
import { startViewTransition } from "@/lib/theme";
import NavMenuIcon from "../../MenuIcon";
import AdminAccount from "./AdminAccount";
import Notifications from "./Notifications";
import ThemeTrigger from "./ThemeTrigger";

const PanelHeader = (): JSX.Element => {
    const {
        setSidebarState,
        closed,
        isSidebarResponsiveOpen,
        setResponsiveSidebarState,
    } = useSidebar();
    const { isLoading, session } = useDBSession();
    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";

    if (isLoading) {
        return <DotLoadingScreen text="Chargement en cours..." />;
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

            {/* Menu icon if tablet and mobile*/}
            <NavMenuIcon
                className="![&>svg]:size-4 md:![&>svg]:size-5 !px-3 !py-1 sm:ml-2 md:!px-4 md:!py-2"
                isOpen={isSidebarResponsiveOpen}
                openNav={() =>
                    setResponsiveSidebarState(!isSidebarResponsiveOpen)
                }
            />

            <div className="panel-header__actions relative flex items-center space-x-4 md:space-x-6">
                <div className="space-x-4 md:space-x-4">
                    <Notifications />

                    <ThemeTrigger
                        isDark={isDark}
                        changeTheme={() =>
                            startViewTransition(() =>
                                setTheme(isDark ? "light" : "dark"),
                            )
                        }
                    />
                </div>

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
