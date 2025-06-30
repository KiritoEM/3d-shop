"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackBtn = (): JSX.Element => {
    const router = useRouter();
    return (
        <div className="back-btn h-fit w-fit" onClick={() => router.back()}>
            <ArrowLeft className="cursor-pointer" />
        </div>
    );
};

export default BackBtn;
