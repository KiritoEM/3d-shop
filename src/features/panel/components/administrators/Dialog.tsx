import { FC, ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useFormDialog } from "@/store/formDialog";

type AdminDialogProps = {
    trigger: ReactNode;
    content: ReactNode;
};

const AdminDialog: FC<AdminDialogProps> = ({
    trigger,
    content,
}): JSX.Element => {
    const { open, setDialogState } = useFormDialog();
    return (
        <Dialog open={open} onOpenChange={() => setDialogState(!open)}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent className="scrollable-section overflow-y-auto sm:max-h-[84vh] sm:max-w-[470px]">
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
