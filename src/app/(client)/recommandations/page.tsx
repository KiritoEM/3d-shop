import AvatarViewCanvas from "@/components/3d-models/avatar/viewCanvas";
import RecommandationsBot from "@/features/recommandations/components/RecommandationsBot";

const Recommandations = (): JSX.Element => {
    return (
        <section className="recommandations mt-[120px] w-full overflow-hidden">
            <div className="recommandations__container container flex gap-12">
                <RecommandationsBot />

                <div className="bot-avatar w-[57%] h-[calc(100vh-120px)] flex items-center justify-center">
                    <AvatarViewCanvas />
                </div>
            </div>
        </section>
    );
};

export default Recommandations;