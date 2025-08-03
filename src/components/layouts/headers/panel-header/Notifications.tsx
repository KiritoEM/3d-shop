import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import React from "react";

const Notifications = (): JSX.Element => {
    return (
        <Button
            className="notifications-trigger bg-gray !h-10 !w-10 rounded-full !px-0 !py-0 transition-transform duration-100 md:!h-11 md:!w-11 hover:[&>svg]:scale-110"
            size="lg"
            variant="secondary"
        >
            <BellIcon className="m-auto size-4" />
        </Button>
    );
};

export default Notifications;
