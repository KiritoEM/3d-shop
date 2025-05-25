import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { JSX } from "react";

const Hero = (): JSX.Element => {
  return (
    <section id="hero" className="flex items-center justify-center relative">
      <div className="hero-gradient absolute z-10 -top-[9vh] -left-3">
        <img src="/landing/hero-bg.png" className="w-screen" />
      </div>

      <div className="hero__content relative text-center z-20 mt-[28.5vh] 2xl:mt-[38vh] flex flex-col items-center space-y-6">
        <div className="hero__illustrations">
          <img
            src="/landing/megaphone.svg"
            className="absolute z-20 -top-[120px] -left-[142px] w-[365px]"
            alt="megaphones"
          />

          <img
            src="/landing/headphones.svg"
            className="absolute z-20 -top-[110px] -right-[110px] w-[280px]"
            alt="megaphones"
          />
        </div>

        <div className="tag w-fit rounded-full border px-5 py-2 flex items-center space-x-3 text-[13px]">
          <span className="text-[#CAC4C4]">Besoin de recommandation?</span>
          <span className="flex gap-1 items-center text-primary">
            Explorer <ArrowRight className="size-4" />
          </span>
        </div>

        <h1 className="font-michroma text-[5em] leading-none">
          Découvrez <br /> un shopping en 3D
        </h1>

        <Button size="lg" className="rounded-full mt-8">
          Voir nos produits
        </Button>
      </div>
    </section>
  );
};

export default Hero;
