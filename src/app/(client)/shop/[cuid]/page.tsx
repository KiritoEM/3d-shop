import BackBtn from "@/components/BackBtn";
import ProductContent from "@/features/product-page/components/ProductContent";

const ProductPage = async ({
    params,
}: {
    params: Promise<{ cuid: string }>;
}): Promise<JSX.Element> => {
    const { cuid } = await params;

    return (
        <section className="product-page container mt-[116px] !px-5 md:!px-7 lg:!px-10 xl:!px-14">
            <BackBtn />

            <ProductContent cuid={cuid} />
        </section>
    );
};

export default ProductPage;
