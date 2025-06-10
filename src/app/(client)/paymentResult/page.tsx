import { Button } from "@/components/ui/button";
import Lottie from "@/features/payement/components/Lottie";
import { getStripSession } from "@/features/payement/services/paymentServices";
import { Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const PaymentResult = async ({ searchParams }: { searchParams: any }): Promise<JSX.Element> => {
    const sessionId = (await searchParams).session_id;

    if (!sessionId) {
        redirect("/shop");
    }

    const session = await getStripSession(sessionId);

    return (
        <div className="payment-result w-full overflow-hidden flex justify-center text-center mx-auto px-5 md:px-7">
            <div className="payement-result__content mt-[140px] mb-12 flex flex-col space-y-6 max-w-2xl rounded-lg border shadow-md p-9">
                <Lottie />

                <div className="text-xl space-y-4 w-full">
                    <p>
                        Bonjour <span className="font-semibold">{session?.customer_details?.name}</span>,<br />
                        Nous vous remercions pour votre commande. Votre paiement a été traité avec succès.<br /><br />
                        Un email de confirmation vous a été envoyé à <span className="font-medium text-primary">{session?.customer_details?.email}</span> avec les détails de votre achat.
                    </p>

                    <Button className="rounded-full !px-5 mt-2" asChild>
                        <Link href="/shop"><Home /> Revenir au shop</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentResult;