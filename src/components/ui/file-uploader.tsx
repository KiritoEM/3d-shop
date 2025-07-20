import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface IFileUploaderProps extends React.ComponentProps<"div"> {
    dragNdropDescription?: string;
}

const fileUploader: FC<IFileUploaderProps> = ({
    dragNdropDescription = `Télécharger uniquement des`,
    className,
    ...props
}): JSX.Element => {
    return (
        <div className={cn("file-uploader w-full", className)} {...props}>
            <div className="file-uploader__content"></div>
        </div>
    );
};

export default fileUploader;
