"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ComponentType, useLayoutEffect } from "react";

type HOCProps = {
    Component: ComponentType<JSX.Element>
}

const checkIsAuthentified = (Component: HOCProps["Component"], redirectUrl: string = "recommandations") => {
    return function IsAuth(props: any) {
        const { status } = useSession();

        console.log(status);

        useLayoutEffect(() => {
            if (status === "unauthenticated") {
                return redirect(`/login?url=${redirectUrl}`);
            }
        }, [])

        return <Component {...props} />
    }
};

export default checkIsAuthentified;