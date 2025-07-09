"use client";

import { FC } from "react";
import { Avatar } from "./ui/avatar";

type AccountPreviewProps = {
    email: string;
    name: string;
    image?: string;
};

const AccountPreview: FC<AccountPreviewProps> = ({
    email,
    name,
    image,
}): JSX.Element => {
    console.log(image);
    return (
        <div className="account-preview hidden w-fit items-center gap-6 rounded-lg border p-5 sm:flex xl:p-6">
            <Avatar name={name} image={image} className="!size-17" />

            <div className="account-preview__details">
                <h5 className="text-xl font-medium xl:text-2xl">{name}</h5>
                <p className="text-primary mt-1">{email}</p>
            </div>
        </div>
    );
};

export default AccountPreview;
