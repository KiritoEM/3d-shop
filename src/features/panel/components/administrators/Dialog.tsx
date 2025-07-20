import { FC, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type AdminDialogProps = {
    trigger: ReactNode;
    content: ReactNode;
};

const AdminDialog: FC<AdminDialogProps> = ({
    trigger,
    content,
}): JSX.Element => {
    return (
        <Dialog open>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent className="sm:max-w-[460px]">
                <DialogHeader>
                    <DialogTitle className="font-michroma">
                        Ajouter un compte
                    </DialogTitle>
                    <DialogDescription>
                        Ajouter les informations du compte admin et cliquer sur
                        Créer pour confirmer
                    </DialogDescription>
                </DialogHeader>

                {content}
            </DialogContent>
        </Dialog>
    );
};

export { AdminDialog };
