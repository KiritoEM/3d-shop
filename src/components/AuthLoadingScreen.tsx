import { FC } from "react";

type AuthLoadingScreenProps = {
    text?: string
};

const AuthLoadingScreen: FC<AuthLoadingScreenProps> = ({ text = "Vérification de la session..." }): JSX.Element => {
    return (
        <div className="auth-loading-screen fixed top-0 left-0 w-screen z-50 h-screen bg-background overflow-hidden flex items-center justify-center">
            <div className="auth-loading-screen__content flex flex-col items-center space-y-3">
                <div className="dots-loader w-fit" />
                <span className="font-michroma text-lg text-center">{text}</span>
            </div>
        </div>
    );
};

export default AuthLoadingScreen;