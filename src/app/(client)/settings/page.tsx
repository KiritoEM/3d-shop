import AccountPreview from "@/components/AccountPreview";
import Error from "@/components/error";
import Block from "@/features/user-settings/components/Block";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UserSetting = async (): Promise<JSX.Element> => {
    const serverSession = await getServerSession(authOptions);
    const token = (await cookies()).get("session_id");

    if (!serverSession || !serverSession.user) {
        redirect("/login?callbackUrl=settings");
    }

    if (!serverSession || !serverSession.user) {
        return <Error error="Un erreur s'est produit" />;
    }

    type SessionUserWithId = typeof serverSession.user & { id: string };
    const userSession = serverSession.user as SessionUserWithId;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userSession.id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.value}`,
            },
            cache: "no-store",
        },
    );

    if (!response.ok) {
        return <Error error="Un erreur s'est produit" />;
    }

    return (
        <section className="user-settings mt-[126px] w-full overflow-hidden">
            <div className="container">
                <header>
                    <h3 className="font-michroma text-4xl">Paramètres</h3>
                </header>

                {/* <AccountPreview /> */}

                <div className="user-settings__content mt-12">
                    <Block
                        title="Informations personnelles"
                        subtitle="Mettre à jour vos informations personnelle ou votre photo de profil"
                    >
                        <></>
                    </Block>
                </div>
            </div>
        </section>
    );
};

export default UserSetting;
