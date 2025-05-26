import About from "@/features/landing/components/About";
import Hero from "@/features/landing/components/Hero";
import { JSX } from "react";

const Landing = (): JSX.Element => {
  return (
    <section className="landing">
      <Hero />
      <About />
    </section>
  );
};

export default Landing;
