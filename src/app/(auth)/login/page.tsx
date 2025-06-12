import LoginForm from "@/features/auth/components/LoginForm";

const Login = async ({ searchParams }: { searchParams: any }): Promise<JSX.Element> => {
    const urlRedirect = (await searchParams).url;
    const error = (await searchParams).error;

    return <LoginForm urlRedirect={urlRedirect} error={error} />;
};

export default Login;