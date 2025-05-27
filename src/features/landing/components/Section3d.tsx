import IphoneViewCanvas from "@/components/3d-models/iphone/viewCanvas";
import About from "./About";
import Steps from "./Steps";

const Section3d = (): JSX.Element => {
  return (
    <section className="section-3d relative">
      <div className="iphone-model-container absolute left-0 top-0 h-[120vh] w-screen z-10 overflow-visible">
        <IphoneViewCanvas />
      </div>

      <About />
      <Steps />
    </section>
  );
};

export default Section3d;
