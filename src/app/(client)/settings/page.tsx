import { headers } from "next/headers";
import AccountPreview from "@/components/AccountPreview";
import Error from "@/components/error";
import Block from "@/features/user-settings/components/Block";
import ChangeUserInfo from "@/features/user-settings/components/ChangeUserInfo";
import { authOptions } from "@/lib/nextauth";
import SecurityForm from "@/features/user-settings/components/SecurityForm";
import { validateSession } from "@/lib/sessions/serverSessionUtilities";
import { IUser } from "@/models/userModel";

const UserSetting = async (): Promise<JSX.Element> => {
    await validateSession(authOptions, "settings");
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
            credentials: "include",
            headers: await headers(),
        },
    );

    if (!response.ok) {
        return <Error error="Un erreur s'est produit" />;
    }

    const userInfo = (await response.json()).user as IUser;
    const authentificatedOAuth = userInfo.accounts.some(
        (acc) => acc.type === "oauth",
    );

    return (
        <section className="user-settings mb-12 mt-[126px] w-full overflow-hidden">
            <div className="container">
                <header>
                    <h3 className="font-michroma text-3xl lg:text-4xl">
                        Paramètres
                    </h3>
                </header>

                <div className="user-settings__content mt-12 space-y-12 lg:space-y-14">
                    <AccountPreview
                        email={userInfo.email}
                        name={userInfo.name}
                        image={userInfo.image ?? ""}
                    />

                    <Block
                        title="Informations personnelles"
                        description="Personnalisez votre compte utilisateur et assurez-vous que vos coordonnées sont correctes"
                    >
                        <ChangeUserInfo
                            id={userInfo.id}
                            image={userInfo.image ?? ""}
                            email={userInfo.email}
                            name={userInfo.name}
                            isOAuth={authentificatedOAuth}
                        />
                    </Block>

                    {!authentificatedOAuth && (
                        <Block
                            title="Mot de passe et sécurité"
                            description="Changez votre mot de passe ou ajouter des authentifications à deux facteurs"
                        >
                            <SecurityForm id={userInfo?.id} />
                        </Block>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserSetting;
