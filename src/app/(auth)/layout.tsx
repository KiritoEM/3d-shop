import Image from "next/image";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="auth w-full min-h-screen overflow-hidden bg-no-repeat bg-cover flex items-center justify-center">
      <div className="auth__illustrations hidden md:block">
        <Image src="/auth/online-shoping.svg" height={400} width={400} alt="" className="w-[400px] h-[400px] object-cover fixed z-10 top-[20vh] left-[4vw]" />
        <Image src="/auth/card-paiement.svg" height={400} width={400} alt="" className="w-[452px] h-[452px] object-cover fixed z-10 top-[16vh] right-[4vw]" />
      </div>

      {children}
    </section>
  );
}
