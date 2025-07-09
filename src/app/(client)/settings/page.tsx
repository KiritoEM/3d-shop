import { cookies } from "next/headers";
import AccountPreview from "@/components/AccountPreview";
import Error from "@/components/error";
import Block from "@/features/user-settings/components/Block";
import ChangeUserInfo from "@/features/user-settings/components/ChangeUserInfo";
import { fetchUserInfo } from "@/features/user-settings/services/userServices";
import { validateSession } from "@/features/user-settings/utilities/serverSessionUtilities";
import { authOptions } from "@/lib/auth";

const UserSetting = async (): Promise<JSX.Element> => {
    const token = (await cookies()).get("session_id");
    const userSession = await validateSession(authOptions);
    const response = await fetchUserInfo(userSession, token?.value ?? "");

    if (!response.ok) {
        return <Error error="Un erreur s'est produit" />;
    }

    const userInfo = (await response.json()).user;

    return (
        <section className="user-settings mb-12 mt-[126px] w-full overflow-hidden">
            <div className="container">
                <header>
                    <h3 className="font-michroma text-4xl">Paramètres</h3>
                </header>

                <div className="user-settings__content mt-12 space-y-14">
                    <AccountPreview
                        email={userInfo.email}
                        name={userInfo.name}
                        image={userInfo.image}
                    />

                    <Block
                        title="Informations personnelles"
                        description="Personnalisez votre compte utilisateur et assurez-vous que vos coordonnées sont correctes"
                    >
                        <ChangeUserInfo
                            id={userInfo.id}
                            image={userInfo.image}
                            email={userInfo.email}
                            name={userInfo.name}
                        />
                    </Block>
                </div>
            </div>
        </section>
    );
};

export default UserSetting;
