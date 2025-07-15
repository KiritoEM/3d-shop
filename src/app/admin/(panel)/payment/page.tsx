import { Button } from "@/components/ui/button";
import SectionHeader from "@/features/panel/components/SectionHeader";
import TableControls from "@/features/panel/components/TableControls";
import { ArrowUp } from "lucide-react";

const Payment = (): JSX.Element => {
    return (
        <section className="payment mt-8">
            <SectionHeader
                title="Paiements"
                rightSide={
                    <Button>
                        <ArrowUp /> Exporter en CSV
                    </Button>
                }
            />

            <TableControls placeholder="Nom de client..." />
        </section>
    );
};

export default Payment;
