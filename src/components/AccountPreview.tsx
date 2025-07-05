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
    return (
        <div className="account-preview flex items-center gap-8">
            <Avatar name={name} email={email} image={image} />

            <div className="account-preview__details">
                <h3 className="font-michroma text-3xl">{name}</h3>
                <p className="mt-2">{email}</p>
            </div>
        </div>
    );
};

export default AccountPreview;
