import { Button } from "@/components/ui/button";
import Image from "next/image";

const PromptInput = (): JSX.Element => {
    return (
        <div className="prompt-input w-full rounded-xl mt-14 border border-border h-[150px] dark:bg-[#171819] p-4 flex flex-col items-end justify-between gap-5">
            <input
                type="text"
                className="outline-none w-full"
                autoComplete="off"
                placeholder="Entrez votre description... (ex: ‘une montre apple watch’)"
            />

            <Button className="rounded-full w-10 h-10 !px-0 !py-0 bg-primary hover:bg-primary/90 transition-colors cursor-pointer">
                <Image src="/icons/send.svg" width={20} height={20} alt="send-icon" />
            </Button>
        </div>
    );
};

export default PromptInput;