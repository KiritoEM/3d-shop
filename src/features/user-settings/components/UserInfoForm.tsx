"use client";

import { FC, useEffect, useRef, useState, useTransition } from "react";
import dynamic from "next/dynamic";
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
import OTP from "@/lib/otp";
import { useDialog } from "@/hooks/useDialog";

const OtpValidationDialog = dynamic(
    () => import("@/components/email-validation-dialog/OtpValidationDialog"),
    {
        ssr: false,
    },
);

type UserInfoFormProps = {
    name: string;
    email: string;
};

const UserInfoForm: FC<UserInfoFormProps> = ({ name, email }): JSX.Element => {
    const form = useForm<ISettingsSchema>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            mode: "user",
            email: email,
            name: name,
        },
    });

    const { setDialogState, setEmail } = useDialog();
    const [isDisabled, setDisabled] = useState<boolean>(true);
    const otpRef = useRef<OTP>(new OTP());
    const [isPending, startTransition] = useTransition();

    const watchedValues = form.watch();

    useEffect(() => {
        const hasChanges =
            watchedValues.email.trim() !== email.trim() ||
            watchedValues.name.trim() !== name.trim();
        setDisabled(!hasChanges);
    }, [watchedValues, email, name]);

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

    const onSubmit = (data: ISettingsSchema) => {
        startTransition(async () => {
            if (data.email !== email) {
                await handleSendEmail(
                    otpRef.current.generateOTPCode(),
                    data.email,
                );
            }
        });
    };

    return (
        <div className="change-personal-info">
            <div className="personal-info__form w-[50%]">
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

            {/* Dialog */}
            <OtpValidationDialog otpRef={otpRef} />
        </div>
    );
};

export default UserInfoForm;
