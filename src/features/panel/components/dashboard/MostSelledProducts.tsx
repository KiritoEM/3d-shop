import Link from "next/link";
import CardHeader from "./CardHeader";

const MostSelledProducts = (): JSX.Element => {
    return (
        <article className="most-selled_products-card bg-gray rounded-lg p-6">
            <CardHeader
                title="Produits le plus vendus"
                rightSide={
                    <Link
                        href=""
                        className="text-primary cursor-pointer text-sm hover:font-semibold"
                    >
                        Voir tout
                    </Link>
                }
            />
        </article>
    );
};

export default MostSelledProducts;
