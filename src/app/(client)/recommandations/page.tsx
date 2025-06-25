"use client"

import AvatarViewCanvas from "@/components/3d-models/avatar/viewCanvas";
import RecommandationsBot from "@/features/recommandations/components/RecommandationsBot";
import checkIsAuthentified from "@/HOC/isAuthentified";

const Recommandations = (): JSX.Element => {
    return (
        <section className="recommandations mt-[105px] lg:mt-[120px] w-full overflow-hidden">
            <div className="recommandations__container container flex gap-12 h-[calc(100vh-120px)]">
                <RecommandationsBot />

                <div className="bot-avatar hidden lg:flex w-[52%] xl:w-[57%] items-center justify-center">
                    <AvatarViewCanvas />
                </div>
            </div>
        </section>
    );
};

export default checkIsAuthentified(Recommandations);