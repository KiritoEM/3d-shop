"use client";

import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { FC, useTransition } from "react";
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
import { deleteUser } from "../actions/userSettingsActions";
import { signOut } from "next-auth/react";

type DeleteAccountProps = {
    id: string;
};

const DeleteAccount: FC<DeleteAccountProps> = ({ id }): JSX.Element => {
    const [isPending, startTransition] = useTransition();

    const handleDeleteAccount = () => {
        startTransition(async () => {
            const response = await deleteUser(id);

            if (response.status === "error") {
                toast(response.message, {
                    theme: "colored",
                    type: "error",
                });
            }

            toast(response.message, {
                theme: "colored",
                type: "success",
            });

            await signOut({
                redirect: true,
                callbackUrl: "/",
            });
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="submit"
                    className="text-destructive hover:!bg-destructive min-w-[120px] hover:!border-none hover:text-white"
                    variant="outline"
                >
                    <Trash2 />
                    Supprimer le compte
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmation de suppression</DialogTitle>
                    <DialogDescription>
                        Etes-vous sur de supprimer votre compte?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-5 flex space-x-4">
                    <DialogClose asChild>
                        <Button variant="outline">Annuler</Button>
                    </DialogClose>

                    <Button
                        type="submit"
                        variant="destructive"
                        isLoading={isPending}
                        disabled={isPending}
                        onClick={handleDeleteAccount}
                    >
                        {!isPending && <Trash2 />}
                        {isPending ? "Supression..." : "Supprimer"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAccount;
