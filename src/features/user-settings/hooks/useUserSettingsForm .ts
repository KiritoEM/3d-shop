"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import OTP from "@/lib/otp";
import { IUserSettingsSchema } from "@/lib/zod-schemas/settingsSchemas";
import { toast } from "react-toastify";
import { pickObjectField } from "@/lib/utils";
import { User } from "@prisma/client";
import { updateSession } from "@/lib/session-utilities/clientSessionUtilities";

const useUserSettingsForm = (
    watchedValues: IUserSettingsSchema,
    initialData: { id: string; image: string; email: string; name: string },
    uploadedAvatar: File | null,
    dialogStatus: "success" | "failed",
    submitAction: Function,
    update: Function,
) => {
    const [isDisabled, setDisabled] = useState<boolean>(true);
    const otpRef = useRef<OTP>(new OTP());
    const dataSubmittedRef = useRef<
        IUserSettingsSchema & { image?: File | string }
    >(null);
    const [isPending, startTransition] = useTransition();

    //hook for handling form fields value changing
    useEffect(() => {
        const hasChanges =
            watchedValues.email.trim() !== initialData.email.trim() ||
            watchedValues.name.trim() !== initialData.name.trim() ||
            uploadedAvatar !== null;

        setDisabled(!hasChanges);
    }, [watchedValues, initialData.email, initialData.name]);

    //hook for waiting email-dialog response if the email is changed
    useEffect(() => {
        const handleUpdateUser = async () => {
            const updatedUserResponse = await submitAction(
                dataSubmittedRef.current,
                initialData.id,
            );

            if (updatedUserResponse.status === "error") {
                toast(updatedUserResponse.message, {
                    theme: "colored",
                    type: "error",
                });
            } else {
                await updateSession(
                    pickObjectField<User, keyof User>(
                        updatedUserResponse.data as User,
                        ["name", "email", "image"],
                    ),
                    update,
                );

                toast(updatedUserResponse.message, {
                    theme: "colored",
                    type: "success",
                });
            }
        };

        if (dialogStatus === "success") {
            handleUpdateUser();
        }
    }, [dialogStatus, submitAction, initialData.id]);

    return {
        dataSubmittedRef,
        isDisabled,
        isPending,
        otpRef,
        startTransition,
    };
};

export default useUserSettingsForm;
