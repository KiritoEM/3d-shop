import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminCard from "@/features/panel/components/administrators/AdminCard";
import SectionHeader from "@/features/panel/components/SectionHeader";
import { getToken } from "@/lib/sessions/dbSession";
import Error from "@/components/error";
import { IAdminInfo } from "@/models/adminModel";
import { Suspense } from "react";
import AdministratorLoading from "./loading";

const Admin = async (): Promise<JSX.Element> => {
    const token = await getToken();
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/info`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        return <Error error="Un erreur s'est produit" />;
    }

    const adminData = (await response.json()) as IAdminInfo[];

    return (
        <section className="admin mt-8">
            <SectionHeader
                title="Administrateurs"
                description="Listes des comptes administrateurs"
                rightSide={
                    <Button>
                        <Plus /> Ajouter un compte
                    </Button>
                }
            />

            <Suspense fallback={<AdministratorLoading />}>
                <div className="administrator-list sm2:grid-cols-2 mt-10 grid gap-x-5 gap-y-6 lg:gap-x-5 xl:grid-cols-3">
                    {adminData.map((admin) => (
                        <AdminCard key={admin.id} {...admin} />
                    ))}
                </div>
            </Suspense>
        </section>
    );
};

export default Admin;
