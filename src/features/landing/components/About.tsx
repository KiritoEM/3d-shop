import { ABOUT_DATA } from "@/helpers/data/landing-data";
import { AboutCardTypes } from "@/helpers/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, JSX } from "react";

const AboutCard: FC<AboutCardTypes> = ({ icon, text, index }) => {
  return (
    <article
      className={cn(
        "p-5 yellow-linear flex items-center space-x-8",
        index! % 2 === 0 && "relative left-14"
      )}
    >
      <div className="about-cards__icon w-[128px] h-[128px] bg-white rounded-xl flex items-center justify-center">
        <Image src={icon} height={58} width={58} alt={icon.split(".")[0]} />
      </div>

      <h4 className="about-cards__title text-2xl flex-1">{text}</h4>
    </article>
  );
};

const About = (): JSX.Element => {
  return (
    <section className="about container px-0 mb-20 pl-12 min-h-screen flex justify-end">
      <div className="content w-full max-w-[600px] relative z-20 right-[60px]">
        <h2 className="content__title font-michroma text-5xl text-foreground">
          Découvrez une nouvelle façon de shopper
        </h2>

        <div className="about-cards flex flex-col space-y-8 mt-16">
          {ABOUT_DATA.map((item, index) => (
            <AboutCard key={index} index={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
