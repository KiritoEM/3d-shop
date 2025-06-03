import SmoothScrolling from "@/components/SmoothScrolling";
import Explore from "@/features/landing/components/Explore";
import Footer from "@/features/landing/components/Footer";
import Hero from "@/features/landing/components/Hero";
import Section3d from "@/features/landing/components/Section3d";
import { JSX } from "react";

const Landing = (): JSX.Element => {
  return (
    <SmoothScrolling>
      <section className="landing overflow-hidden">
        <Hero />
        <Section3d />
        <Explore />
        <Footer />
      </section>
    </SmoothScrolling>
  );
};

export default Landing;
