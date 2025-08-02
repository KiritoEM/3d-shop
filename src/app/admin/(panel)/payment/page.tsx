import TransactionsContent from "@/features/panel/components/transactions/Transactions";

const Transactions = async (): Promise<JSX.Element> => {
    return (
        <section className="payment mt-8">
            <TransactionsContent />
        </section>
    );
};

export default Transactions;
