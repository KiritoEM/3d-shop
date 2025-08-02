import { cn } from "@/lib/utils";
import React, { RefObject } from "react";

type CameraProps<T> = {
    ref: RefObject<T>;
    cameraClass: string[];
} & React.ComponentProps<"video">;

function Camera<T>({
    ref,
    cameraClass,
    ...props
}: CameraProps<T>): JSX.Element {
    return (
        <video
            ref={ref}
            className={cn(...cameraClass)}
            muted
            playsInline
            {...props}
        />
    );
}

export default Camera;
