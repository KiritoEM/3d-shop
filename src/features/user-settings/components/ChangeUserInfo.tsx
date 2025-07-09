"use client";

import { FC, Fragment } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmail } from "@/actions/sendEmailActions";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    ISettingsSchema,
    settingsSchema,
} from "@/lib/zod-schemas/settingsSchemas";
import { useFormDialog } from "@/hooks/useFormDialog";
import useUploadFile from "@/hooks/useUploadFile";
import { IMAGE_TYPES } from "@/constants/constants";
import { updateUser } from "../actions/userSettingsActions";
import useUserSettingsForm from "../hooks/useUserSettingsForm ";
import AvatarUploader from "./AvatarUploader";
import { updateSession } from "../utilities/clientSessionUtilities";
import { pickObjectField } from "@/lib/utils";
import { User } from "@prisma/client";

const OtpValidationDialog = dynamic(
    () => import("@/components/email-validation-dialog/OtpValidationDialog"),
    {
        ssr: false,
    },
);

type ChangeUserInfoProps = {
    id: string;
    image: string;
    email: string;
    name: string;
};

const ChangeUserInfo: FC<ChangeUserInfoProps> = ({
    id,
    image,
    email,
    name,
}): JSX.Element => {
    const form = useForm<ISettingsSchema>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            mode: "user",
            email: email,
            name: name,
        },
    });

    const watchedValues = form.watch();

    const { update } = useSession();
    const { setDialogState, setEmail, status } = useFormDialog();
    const { handleUploadFile, uploadedFile, resetField } = useUploadFile(
        "IMAGE",
        IMAGE_TYPES,
    );
    const { dataSubmittedRef, isPending, isDisabled, otpRef, startTransition } =
        useUserSettingsForm(
            watchedValues,
            { id, email, name, image },
            uploadedFile,
            status,
            updateUser,
        );

    //handle email for otp validation
    const handleSendEmail = async (otp: string, email: string) => {
        try {
            const { status, message } = await sendEmail<"sendOTP">(
                email,
                "Email verification",
                "sendOTP",
                {
                    validationCode: otp,
                },
            );

            if (status === "error") {
                toast(message, {
                    theme: "colored",
                    type: "error",
                });
            } else if (status === "success") {
                toast(message, {
                    theme: "colored",
                    type: "success",
                });
                setDialogState(true);
                setEmail(email);
            }
        } catch (error) {
            toast("Une erreur est survenue lors de l'envoi de l'email", {
                theme: "colored",
                type: "error",
            });
        }
    };

    // Form submit handler
    const onSubmit = (data: ISettingsSchema) => {
        startTransition(async () => {
            if (data.mode === "user") {
                const dataWithImage = {
                    ...data,
                    image: uploadedFile ? uploadedFile : image,
                };

                if (data.email !== email) {
                    //if email changed
                    dataSubmittedRef.current = dataWithImage;
                    await handleSendEmail(
                        otpRef.current.generateOTPCode(),
                        data.email,
                    );
                    return;
                }

                const updatedUserResponse = await updateUser(dataWithImage, id);

                if (updatedUserResponse.status === "error") {
                    toast(updatedUserResponse.message, {
                        theme: "colored",
                        type: "error",
                    });
                } else {
                    updateSession(
                        pickObjectField<User, keyof User>(
                            updatedUserResponse.data as User,
                            ["name", "email", "image"],
                        ),
                    );

                    toast(updatedUserResponse.message, {
                        theme: "colored",
                        type: "success",
                    });
                }
            }
        });
    };

    return (
        <Fragment>
            <div className="change-personal-info flex items-center gap-6">
                <div className="personal-info__form w-[40%]">
                    <Form {...form}>
                        <form
                            className="space-y-7"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Votre nom</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full max-w-[440px]"
                                                type="text"
                                                placeholder="Entrez votre nom"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Votre email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full max-w-[440px]"
                                                type="email"
                                                placeholder="Entrez votre email"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isDisabled || isPending}
                                className="min-w-[120px]"
                            >
                                {isPending ? "Mise à jour..." : "Mettre à jour"}
                            </Button>
                        </form>
                    </Form>
                </div>

                <AvatarUploader
                    name={name}
                    previewAvatar={image}
                    uploadedAvatar={
                        uploadedFile ? URL.createObjectURL(uploadedFile) : ""
                    }
                    uploadAvatar={handleUploadFile}
                />
            </div>

            {/* Dialog */}
            <OtpValidationDialog otpRef={otpRef} />
        </Fragment>
    );
};

export default ChangeUserInfo;
