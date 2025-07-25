import { UploadCloud, X } from "lucide-react";
import React, { FC } from "react";
import { cn, truncateFileName } from "@/lib/utils";
import { IfileType } from "@/types";
import useDragNDrop from "@/hooks/useDragNDrop";
import { handleInputFileChange } from "@/lib/utils";
import { Button } from "./button";

interface IFileUploaderProps extends React.ComponentProps<"label"> {
    dragNdropDescription?: string;
    uploadedFile: File | null;
    FileType: IfileType;
    maxFileNameLength?: number;
    onFileSelected: (file: File) => void;
    reset: () => void;
}

const DEFAULT_DESCRIPTION = `<span class='font-medium text-violet-400'>Cliquer pour télécharger</span> votre fichier ou <span class='font-medium text-violet-400'>glisser le</span>`;

const FileUploader: FC<IFileUploaderProps> = ({
    dragNdropDescription = DEFAULT_DESCRIPTION,
    FileType,
    uploadedFile,
    onFileSelected,
    reset,
    className,
    maxFileNameLength = 24,
    ...props
}): JSX.Element => {
    const {
        isDragged,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    } = useDragNDrop(onFileSelected);

    const renderMediaPreview = (type: IfileType): JSX.Element | null => {
        switch (type) {
            case "IMAGE":
                return (
                    <ImagePreview
                        uploadedFile={uploadedFile!}
                        maxFileNameLength={maxFileNameLength}
                        reset={reset}
                    />
                );

            default:
                return <></>;
        }
    };

    return (
        <div className="drag-drop border-input w-full cursor-pointer">
            {" "}
            {!uploadedFile ? (
                <label
                    htmlFor="input-uploader"
                    className={cn(
                        "file-uploader dark:bg-input/30 grid h-[194px] w-full cursor-pointer place-content-center rounded-lg border-2 border-dashed px-5 transition-all duration-100",
                        isDragged ? "border-violet-400" : "border-input",
                        className,
                    )}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    {...props}
                >
                    <div className="file-uploader__field flex h-fit w-fit flex-col items-center gap-4">
                        <div className="text-background border-3 border-gray flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                            {" "}
                            <UploadCloud className="text-background size-6" />
                        </div>

                        <p
                            className="text-muted-foreground text-center text-sm"
                            dangerouslySetInnerHTML={{
                                __html: dragNdropDescription,
                            }}
                        />

                        {/* Input Uploader */}
                        <input
                            type="file"
                            className="hidden"
                            id="input-uploader"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleInputFileChange(onFileSelected, e)}
                        />
                    </div>
                </label>
            ) : (
                renderMediaPreview(FileType)
            )}
        </div>
    );
};

type ImagePreviewProps = {
    uploadedFile: File;
    maxFileNameLength: number;
    reset: () => void;
};

const ImagePreview: FC<ImagePreviewProps> = ({
    uploadedFile,
    maxFileNameLength,
    reset,
}) => {
    return (
        <div className="file-preview relative mt-4 flex h-full w-full items-center justify-between overflow-hidden">
            <div className="file-info flex items-center gap-5">
                <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt="preview-file"
                    className="file-info__image border-3 border-input h-[74px] w-[74px] rounded-xl object-cover"
                />

                <div className="file-info__details">
                    <h6 title={uploadedFile.name}>
                        {truncateFileName(uploadedFile.name, maxFileNameLength)}
                    </h6>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)}
                        MB
                    </p>
                </div>
            </div>

            {/* Remove Button */}
            <Button type="button" variant="ghost" onClick={reset}>
                <X />
            </Button>
        </div>
    );
};

export default FileUploader;
