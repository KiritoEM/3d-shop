import SignupForm from "@/features/auth/components/SignupForm";

const Signup = async ({ searchParams }: { searchParams: any }): Promise<JSX.Element> => {
    const redirectUrl = (await searchParams).redirectUrl;

    return <SignupForm redirectUrl={redirectUrl} />;
};

export default Signup;