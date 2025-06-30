import Image from "next/image";

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="auth flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4">
            <div className="auth__illustrations hidden md:block">
                <Image
                    src="/auth/online-shoping.svg"
                    height={400}
                    width={400}
                    alt=""
                    className="fixed left-[-4rem] top-[30vh] z-10 h-[350px] w-[254px] object-cover lg:left-[1vw] lg:top-[20vh] lg:w-[350px] xl:left-[4vw] xl:h-[400px] xl:w-[400px] 2xl:h-[460px] 2xl:w-[460px]"
                />
                <Image
                    src="/auth/card-paiement.svg"
                    height={400}
                    width={400}
                    alt=""
                    className="fixed right-[-4rem] top-[26vh] z-10 h-[378px] w-[284px] object-cover lg:right-[1vw] lg:top-[16vh] lg:w-[378px] xl:right-[4vw] xl:h-[452px] xl:w-[452px] 2xl:h-[492px] 2xl:w-[492px]"
                />
            </div>

            {children}
        </section>
    );
}
