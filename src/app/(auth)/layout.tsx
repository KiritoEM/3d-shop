import Image from "next/image";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="auth w-full min-h-screen overflow-hidden bg-center bg-no-repeat bg-cover flex items-center justify-center px-4">
      <div className="auth__illustrations hidden md:block">
        <Image src="/auth/online-shoping.svg" height={400} width={400} alt="" className="w-[254px] lg:w-[350px] xl:w-[400px] 2xl:w-[460px] h-[350px] xl:h-[400px] 2xl:h-[460px] object-cover fixed z-10 top-[30vh] lg:top-[20vh] left-[-4rem] lg:left-[1vw] xl:left-[4vw]" />
        <Image src="/auth/card-paiement.svg" height={400} width={400} alt="" className="w-[284px] lg:w-[378px] xl:w-[452px] 2xl:w-[492px] h-[378px] xl:h-[452px] 2xl:h-[492px] object-cover fixed z-10 top-[26vh] lg:top-[16vh] right-[-4rem] lg:right-[1vw] xl:right-[4vw]" />
      </div>

      {children}
    </section>
  );
}
