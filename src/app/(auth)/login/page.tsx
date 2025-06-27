import LoginForm from "@/features/auth/components/LoginForm";

const Login = async ({ searchParams }: { searchParams: any }): Promise<JSX.Element> => {
    const callbackUrl = (await searchParams).callbackUrl;
    const error = (await searchParams).error;

    return <LoginForm callbackUrl={callbackUrl} error={error} />;
};

export default Login;