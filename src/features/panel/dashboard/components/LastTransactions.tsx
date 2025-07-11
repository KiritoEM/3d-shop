import Link from "next/link";
import CardHeader from "./CardHeader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ITransaction } from "@/models/transactionModel";
import { FC } from "react";
import { formatIntoPrice } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

type LastTransactionsProps = {
    transactionsData: ITransaction[];
};

const LastTransactions: FC<LastTransactionsProps> = ({
    transactionsData,
}): JSX.Element => {
    return (
        <article className="last-transactions-card bg-gray rounded-lg p-6">
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
                    {transactionsData.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell className="flex items-center gap-5">
                                <div className="avatar flex">
                                    <Avatar
                                        name={transaction.customerName}
                                        className="!size-8"
                                    />
                                </div>

                                <span>{transaction.customerName}</span>
                            </TableCell>
                            <TableCell>
                                {formatIntoPrice(transaction.amount)}€
                            </TableCell>
                            <TableCell>
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
