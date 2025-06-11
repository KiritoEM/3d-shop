import SignupForm from "@/features/auth/components/SignupForm";

const Signup = async ({ searchParams }: { searchParams: any }): Promise<JSX.Element> => {
    const urlRedirect = (await searchParams).url;

    return <SignupForm urlRedirect={urlRedirect} />;
};

export default Signup;