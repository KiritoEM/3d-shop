import Error from "@/components/error";
import { Button } from "@/components/ui/button";
import { addPayment } from "@/features/payement/actions/paymentActions";
import Lottie from "@/features/payement/components/Lottie";
import { getStripSession } from "@/features/payement/services/paymentServices";
import { authOptions } from "@/lib/auth";
import { Home } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const PaymentResult = async ({
    searchParams,
}: {
    searchParams: any;
}): Promise<JSX.Element> => {
    const sessionId = (await searchParams).session_id;

    if (!sessionId) {
        redirect("/shop");
    }

    const session = await getStripSession(sessionId);

    if (!session) {
        redirect("/shop");
    }
    const serverSession = await getServerSession(authOptions);
    if (!serverSession || !serverSession.user) {
        redirect("/shop");
    }

    type SessionUserWithId = typeof serverSession.user & { id: string };
    const userWithId = serverSession.user as SessionUserWithId;

    const paymentReponse = await addPayment(session, userWithId.id);

    if (paymentReponse.status === "error") {
        return <Error error="Erreur lors du traitement du paiement" />;
    }

    return (
        <div className="payment-result mx-auto flex w-full justify-center overflow-hidden px-5 text-center md:px-7">
            <div className="payement-result__content mb-12 mt-[140px] flex max-w-2xl flex-col space-y-6 rounded-lg border p-9 shadow-md">
                <Lottie />

                <div className="w-full space-y-4 text-xl">
                    <p>
                        Bonjour{" "}
                        <span className="font-semibold">
                            {session?.customer_details?.name}
                        </span>
                        ,<br />
                        Nous vous remercions pour votre commande. Votre paiement
                        a été traité avec succès.
                        <br />
                        <br />
                        Un email de confirmation vous a été envoyé à{" "}
                        <span className="text-primary font-medium">
                            {session?.customer_details?.email}
                        </span>{" "}
                        avec les détails de votre achat.
                    </p>

                    <Button className="mt-2 rounded-full !px-5" asChild>
                        <Link href="/shop">
                            <Home /> Revenir au shop
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentResult;
