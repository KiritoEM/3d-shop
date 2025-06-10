import LoginForm from "@/features/auth/components/LoginForm";
import Image from "next/image";

const Login = (): JSX.Element => {
    return (
        <section className="login w-full min-h-screen overflow-hidden bg-no-repeat bg-cover flex items-center justify-center">
            <div className="login__illustrations">
                <Image src="/auth/online-shoping.svg" height={400} width={400} alt="" className="w-[400px] h-[400px] object-cover fixed top-[20vh] left-[4vw]" />
                <Image src="/auth/card-paiement.svg" height={400} width={400} alt="" className="w-[452px] h-[452px] object-cover fixed top-[16vh] right-[4vw]" />
            </div>

            <LoginForm />
        </section>
    );
};

export default Login;