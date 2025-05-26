import IphoneViewCanvas from "@/components/3d-models/iphone/viewCanvas";
import About from "./About";

const Section3d = (): JSX.Element => {
  return (
    <section className="section-3d relative">
      <div className="absolute left-0 top-0 h-[150vh] w-screen z-10 overflow-visible">
        <IphoneViewCanvas />
      </div>

      <About />
    </section>
  );
};

export default Section3d;
