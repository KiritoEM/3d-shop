import { FC } from "react";
import Link from "next/link";
import { IProduct } from "@/models/productModel";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatIntoPrice } from "@/lib/utils";
import CardHeader from "./CardHeader";
import { useMediaQuery } from "react-responsive";
import EmptyChart from "../EmptySection";

type LastAddedProductssProps = {
    productsData: IProduct[];
};

const LastAddedProducts: FC<LastAddedProductssProps> = ({
    productsData,
}): JSX.Element => {
    const isLg = useMediaQuery({
        query: "(min-width: 1024px) and (max-width: 1279px)",
    });

    if (!Array.isArray(productsData) || productsData.length === 0) {
        return <EmptyChart cardTitle="Produits ajoutés récemment" />;
    }

    return (
        <article className="product-card dark:bg-gray rounded-lg border p-6 dark:border-0">
            <CardHeader
                title="Produits ajoutés récemment"
                className="!text-[20px] xl:text-xl"
                rightSide={
                    !isLg ? (
                        <Link
                            href=""
                            className="text-primary cursor-pointer text-sm hover:font-semibold"
                        >
                            Voir tout
                        </Link>
                    ) : (
                        <></>
                    )
                }
            />

            <Table className="product-table mt-8">
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
