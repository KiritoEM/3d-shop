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
        <div className="avatar-uploader mt-4 flex h-fit w-[60%] justify-center">
            <div className="mr-18 relative w-fit">
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
                        className="!size-80 object-cover"
                    />
                ) : (
                    <img
                        src={uploadedAvatar}
                        className="size-80 rounded-full object-cover"
                    />
                )}
            </div>
        </div>
    );
};

export default AvatarUploader;
