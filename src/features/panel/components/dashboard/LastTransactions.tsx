import Link from "next/link";
import CardHeader from "./CardHeader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ITransaction } from "@/models/transactionModel";
import { FC } from "react";
import { formatIntoPrice } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

type LastTransactionsProps = {
    transactionsData: Pick<
        ITransaction,
        | "id"
        | "amount"
        | "createdAt"
        | "customerName"
        | "customerEmail"
        | "user"
    >[];
};

const LastTransactions: FC<LastTransactionsProps> = ({
    transactionsData,
}): JSX.Element => {
    if (!Array.isArray(transactionsData) || transactionsData.length === 0) {
        return (
            <article className="user-stats-card dark:bg-gray rounded-lg border p-6 dark:border-0">
                <CardHeader title="Dernières transactions" rightSide={<></>} />
                <div className="flex h-[200px] items-center justify-center">
                    <p>Aucune donnée disponible</p>
                </div>
            </article>
        );
    }

    return (
        <article className="last-transactions-card dark:bg-gray w-full rounded-lg border p-6 dark:border-0">
            <CardHeader
                title="Dernières transactions"
                rightSide={
                    <Link
                        href=""
                        className="text-primary cursor-pointer text-sm hover:font-semibold"
                    >
                        Voir tout
                    </Link>
                }
            />

            <Table className="last-transactions-card__table mt-8">
                <TableBody>
                    {transactionsData.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="flex items-center gap-4">
                                <div className="avatar flex">
                                    <Avatar
                                        name={transaction.customerName}
                                        image={transaction.user?.image ?? ""}
                                        className="!size-8"
                                    />
                                </div>

                                <span>{transaction.customerName}</span>
                            </TableCell>
                            <TableCell>
                                {formatIntoPrice(transaction.amount)}€
                            </TableCell>
                            <TableCell className="text-blue-500">
                                {new Date(
                                    transaction.createdAt,
                                ).toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    );
};

export default LastTransactions;
