"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit2Icon } from "lucide-react";
import { FC } from "react";

type AvatarUploaderProps = {
    previewAvatar?: string;
    uploadedAvatar?: string;
    name: string;
    uploadAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AvatarUploader: FC<AvatarUploaderProps> = ({
    previewAvatar,
    name,
    uploadAvatar,
    uploadedAvatar,
}): JSX.Element => {
    return (
        <div className="avatar-uploader mt-4 flex h-fit w-full sm:w-[50%] sm:justify-center lg:w-[65%] xl:w-[60%]">
            <div className="2xl:mr-18 relative mr-4 w-fit">
                <div className="edit-btn absolute bottom-3 left-3">
                    <Button size="sm" asChild>
                        <label htmlFor="upload-avatar-input">
                            <Edit2Icon /> Modifier
                        </label>
                    </Button>

                    <input
                        type="file"
                        className="hidden"
                        id="upload-avatar-input"
                        onChange={uploadAvatar}
                    />
                </div>

                {!uploadedAvatar ? (
                    <Avatar
                        image={previewAvatar}
                        name={name}
                        className="lg:!size-74 !size-60 object-cover md:!size-64 xl:!size-80"
                    />
                ) : (
                    <img
                        src={uploadedAvatar}
                        className="lg:size-74 size-60 rounded-full object-cover md:size-64 xl:size-80"
                    />
                )}
            </div>
        </div>
    );
};

export default AvatarUploader;
