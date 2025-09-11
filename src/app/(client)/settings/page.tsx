import { headers } from "next/headers";
import AccountPreview from "@/components/AccountPreview";
import Error from "@/components/Error";
import Block from "@/features/user-settings/components/Block";
import ChangeUserInfo from "@/features/user-settings/components/change-user-info/ChangeUserInfo";
import { authOptions } from "@/lib/nextauth";
import SecurityForm from "@/features/user-settings/components/SecurityForm";
import { validateSession } from "@/lib/sessions/serverSessionUtilities";
import { IUser } from "@/models/userModel";
import DeleteAccount from "@/features/user-settings/components/DeleteAccount";
import SettingsHeader from "@/features/user-settings/components/SettingsHeader";
import { fetchApi } from "@/lib/api-utils";

const UserSetting = async (): Promise<JSX.Element> => {
    await validateSession(authOptions, "settings");
    const response = await fetchApi("/api/user", {
        credentials: "include",
    });

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
                <SettingsHeader />

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

                    <Block
                        title="Supprimer votre compte"
                        description="Supprimez définitivement votre compte et toutes les données associées. <br/> Cette action est irréversible."
                    >
                        <DeleteAccount id={userInfo?.id} />
                    </Block>
                </div>
            </div>
        </section>
    );
};

export default UserSetting;
