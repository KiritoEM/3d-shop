"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FC, ReactNode } from "react";
import Webcam from "./Webcam";

type DialogWrapperProps = {
    children: ReactNode;
};

const FacialDialogWrapper: FC<DialogWrapperProps> = ({
    children: trigger,
}): JSX.Element => {
    return (
        <Dialog>
            <DialogTrigger className="w-full" asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[460px] !border-foreground/44">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription className="text-foreground text-md">
                        Afficher votre visage sur la caméra pour pouvoir vous
                        authentifier
                    </DialogDescription>
                </DialogHeader>

                <Webcam />
            </DialogContent>
        </Dialog>
    );
};

export default FacialDialogWrapper;
