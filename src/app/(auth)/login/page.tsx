import LoginForm from "@/features/auth/components/forms/LoginForm";
import { authOptions } from "@/lib/nextauth";
import { redirectIfAuthentificated } from "@/lib/sessions/serverSessionUtilities";

const Login = async ({
    searchParams,
}: {
    searchParams: any;
}): Promise<JSX.Element> => {
    const callbackUrl = (await searchParams).callbackUrl;
    const error = (await searchParams).error;

    await redirectIfAuthentificated(authOptions, callbackUrl ?? "");

    return <LoginForm callbackUrl={callbackUrl} error={error} />;
};

export default Login;
