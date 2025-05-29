import Explore from "@/features/landing/components/Explore";
import Footer from "@/features/landing/components/Footer";
import Hero from "@/features/landing/components/Hero";
import Section3d from "@/features/landing/components/Section3d";
import { JSX } from "react";

const Landing = (): JSX.Element => {
  return (
    <section className="landing">
      <Hero />
      <Section3d />
      <Explore />
      <Footer />
    </section>
  );
};

export default Landing;
