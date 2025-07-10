import SignupForm from "@/features/auth/components/SignupForm";
import { authOptions } from "@/lib/auth";
import { redirectIfAuthentificated } from "@/lib/session-utilities/serverSessionUtilities";

const Signup = async ({
    searchParams,
}: {
    searchParams: any;
}): Promise<JSX.Element> => {
    const redirectUrl = (await searchParams).redirectUrl;
    await redirectIfAuthentificated(authOptions, "");

    return <SignupForm redirectUrl={redirectUrl} />;
};

export default Signup;
