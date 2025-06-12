const AuthLoadingScreen = (): JSX.Element => {
    return (
        <div className="auth-loading-screen w-screen h-screen overflow-hidden flex items-center justify-center">
            <div className="auth-loading-screen__content flex flex-col items-center space-y-3">
                <div className="dots-loader w-fit" />
                <span className="font-michroma text-lg text-center">Vérification de la session...</span>
            </div>
        </div>
    );
};

export default AuthLoadingScreen;