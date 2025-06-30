import { Button } from "@/components/ui/button";
import { Facial } from "@/icons";
import Image from "next/image";

const FacialTrigger = (): JSX.Element => {
    return (
        <Button variant="outline" className="h-10 w-full space-x-5">
            <Facial className="mr-1 hidden !size-5 sm:block" /> Par
            reconnaissance faciale
        </Button>
    );
};

export default FacialTrigger;
