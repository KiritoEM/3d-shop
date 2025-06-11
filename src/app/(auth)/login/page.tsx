import LoginForm from "@/features/auth/components/LoginForm";
import Image from "next/image";

const Login = async ({ searchParams }: { searchParams: any }): Promise<JSX.Element> => {
    const urlRedirect = (await searchParams).url;

    return <LoginForm urlRedirect={urlRedirect} />;
};

export default Login;