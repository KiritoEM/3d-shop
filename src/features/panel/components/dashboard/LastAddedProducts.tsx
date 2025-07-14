import { FC } from "react";
import Link from "next/link";
import { IProduct } from "@/models/productModel";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatIntoPrice } from "@/lib/utils";
import CardHeader from "./CardHeader";

type LastAddedProductssProps = {
    productsData: IProduct[];
};

const LastAddedProducts: FC<LastAddedProductssProps> = ({
    productsData,
}): JSX.Element => {
    if (!Array.isArray(productsData) || productsData.length === 0) {
        return (
            <article className="user-stats-card bg-gray rounded-lg p-6">
                <CardHeader
                    title="Produits ajoutés récemment"
                    rightSide={<></>}
                />
                <div className="flex h-[200px] items-center justify-center">
                    <p>Aucune donnée disponible</p>
                </div>
            </article>
        );
    }

    console.log(productsData);

    return (
        <article className="last-added_product-card bg-gray rounded-lg p-6">
            <CardHeader
                title="Produits ajoutés récemment"
                rightSide={
                    <Link
                        href=""
                        className="text-primary cursor-pointer text-sm hover:font-semibold"
                    >
                        Voir tout
                    </Link>
                }
            />

            <Table className="last-added_product-card__table mt-8">
                <TableBody>
                    {productsData.map((product) => (
                        <TableRow key={product.id} className="w-full">
                            <TableCell className="line-clamp-1 flex w-full max-w-[88%] items-center gap-5 text-ellipsis ">
                                <span>{product.name}</span>
                            </TableCell>
                            <TableCell className="px-3">
                                {formatIntoPrice(product.price)}€
                            </TableCell>
                            <TableCell className="px-3">
                                {product.category.name}
                            </TableCell>
                            <TableCell className="text-blue-500">
                                {new Date(
                                    product.createdAt,
                                ).toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    );
};

export default LastAddedProducts;
