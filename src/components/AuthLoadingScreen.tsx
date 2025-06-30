import { FC } from "react";

type AuthLoadingScreenProps = {
    text?: string;
};

const AuthLoadingScreen: FC<AuthLoadingScreenProps> = ({
    text = "Vérification de la session...",
}): JSX.Element => {
    return (
        <div className="auth-loading-screen bg-background fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden">
            <div className="auth-loading-screen__content flex flex-col items-center space-y-3">
                <div className="dots-loader w-fit" />
                <span className="font-michroma text-center text-lg">
                    {text}
                </span>
            </div>
        </div>
    );
};

export default AuthLoadingScreen;
