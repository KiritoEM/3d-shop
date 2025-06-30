"use client";

import AvatarViewCanvas from "@/components/3d-models/avatar/viewCanvas";
import RecommandationsBot from "@/features/recommandations/components/RecommandationsBot";
import checkIsAuthentified from "@/HOC/isAuthentificated";

const Recommandations = (): JSX.Element => {
    return (
        <section className="recommandations mt-[105px] w-full overflow-hidden lg:mt-[120px]">
            <div className="recommandations__container container flex h-[calc(100vh-120px)] gap-12">
                <RecommandationsBot />

                <div className="bot-avatar hidden w-[52%] items-center justify-center lg:flex xl:w-[57%]">
                    <AvatarViewCanvas />
                </div>
            </div>
        </section>
    );
};

export default checkIsAuthentified(Recommandations);
