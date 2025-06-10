import { Button } from "@/components/ui/button";
import Image from "next/image";

const GoogleAuth = (): JSX.Element => {
    return (
        <Button variant="outline" className="w-full h-10 space-x-4">
            <Image src="/icons/google.svg" height={18} width={18} alt="google-icon" /> Continuer avec Google
        </Button>
    )
};

export default GoogleAuth;