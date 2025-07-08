import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

type GoogleAuthProps = {
    callbackUrl: string;
};

const GoogleAuth: FC<GoogleAuthProps> = ({ callbackUrl }): JSX.Element => {
    return (
        <Button
            variant="outline"
            className="h-10 w-full space-x-4"
            onClick={() => signIn("google", { callbackUrl: `/${callbackUrl}` })}
        >
            <Image
                src="/icons/google.svg"
                height={18}
                width={18}
                alt="google-icon"
            />{" "}
            Continuer avec Google
        </Button>
    );
};

export default GoogleAuth;
