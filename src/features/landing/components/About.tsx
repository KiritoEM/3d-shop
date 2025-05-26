import { ABOUT_DATA } from "@/helpers/data/landing-data";
import { cn } from "@/lib/utils";
import { JSX } from "react";

const About = (): JSX.Element => {
  return (
    <section className="about container px-0 pl-12 min-h-screen flex justify-end">
      <div className="content w-full max-w-[600px] relative right-[50px]">
        <h2 className="content__title font-michroma text-5xl text-foreground">
          Découvrez une nouvelle façon de shopper
        </h2>

        <div className="about-cards flex flex-col space-y-8 mt-16">
          {ABOUT_DATA.map((item, index) => (
            <article
              key={index}
              className={
                cn("p-5 yellow-linear flex items-center space-x-8", index % 2 === 0 && "relative left-24")
              }
            >
              <div className="about-cards__icon w-[140px] h-[140px] bg-white rounded-xl"></div>

              <h4 className="about-cards__title text-2xl flex-1">
                {item.text}
              </h4>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
