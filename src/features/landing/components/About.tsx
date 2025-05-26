import { JSX } from "react";

const About = (): JSX.Element => {
  return (
    <section className="about container px-0 pl-12 min-h-screen">
      <div className="about__content w-[50%]">
        <h2 className="font-michroma text-5xl text-foreground">
          Découvrez une nouvelle façon de shopper
        </h2>
      </div>
    </section>
  );
};

export default About;
