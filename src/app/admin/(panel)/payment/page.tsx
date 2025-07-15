import { Button } from "@/components/ui/button";
import SectionHeader from "@/features/panel/components/SectionHeader";
import TableRendering from "@/features/panel/components/transactions/TableRendering";
import { ArrowUp } from "lucide-react";

const Transactions = async (): Promise<JSX.Element> => {
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

            <TableRendering />
        </section>
    );
};

export default Transactions;
