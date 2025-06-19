import RecommandationsBot from "@/features/recommandations/components/RecommandationsBot";

const Recommandations = (): JSX.Element => {
    return (
        <section className="recommandations mt-[120px] w-full overflow-hidden">
            <div className="recommandations__container container flex items-center gap-12">
                <RecommandationsBot />
            </div>
        </section>
    );
};

export default Recommandations;