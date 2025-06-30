import IphoneViewCanvas from "@/components/3d-models/iphone/viewCanvas";
import About from "./About";
import Steps from "./Steps";

const Section3d = (): JSX.Element => {
    return (
        <section className="section-3d relative z-30">
            <div className="iphone-model-container absolute left-0 top-0 z-10 hidden h-[800px] w-screen md:block">
                <IphoneViewCanvas />
            </div>

            <About />
            <Steps />
        </section>
    );
};

export default Section3d;
