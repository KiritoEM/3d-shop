"use client";

import { FC, RefObject, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useFormDialog } from "@/hooks/useFormDialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import OTP from "@/lib/otp";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

type OtpValidationDialogProps = {
    otpRef: RefObject<OTP>;
};

const OtpValidationDialog: FC<OtpValidationDialogProps> = ({
    otpRef,
}): JSX.Element => {
    const { open, email, setDialogState, setStatus } = useFormDialog();
    const [inputValue, setInputValue] = useState<string>("");

    const validateOTPCode = useCallback(() => {
        if (otpRef.current.checkOTP(inputValue)) {
            toast("Code OTP validé avec succès", {
                type: "success",
                theme: "colored",
            });
            setStatus("success");
        } else {
            toast("Code OTP non valide veuillez réessayer", {
                type: "error",
                theme: "colored",
            });
            setStatus("failed");
        }

        setDialogState(false);
    }, [inputValue, otpRef.current, setDialogState]);
    return (
        <Dialog open={open} onOpenChange={() => setDialogState(!open)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-michroma">
                        Entrez le code de vérification
                    </DialogTitle>
                    <DialogDescription className="mt-2">
                        Nous avons envoyé un email contenant votre code
                        vérification à 6 chiffres à l'adresse email :{" "}
                        <b className="text-primary">"{email}"</b>, entrez le
                        ci-dessous.
                    </DialogDescription>
                </DialogHeader>

                <div className="input-otp mx-auto mt-6">
                    <InputOTP
                        maxLength={6}
                        value={inputValue}
                        onChange={(value) => setInputValue(value)}
                    >
                        <InputOTPGroup className="gap-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <InputOTPSlot
                                    key={i}
                                    index={i}
                                    className="h-12 w-12 rounded-lg border"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <DialogFooter className="text-start">
                    <Button
                        disabled={inputValue.length === 0}
                        onClick={validateOTPCode}
                    >
                        Confirmer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default OtpValidationDialog;
