"use client";

import { FC, useEffect, useState, useTransition } from "react";
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

type ChangePersonalInfoProps = {
    name: string;
    email: string;
};

const ChangePersonalInfo: FC<ChangePersonalInfoProps> = ({
    name,
    email,
}): JSX.Element => {
    const form = useForm<ISettingsSchema>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            mode: "user",
            email: email,
            name: name,
        },
    });

    const [isPending, startTransition] = useTransition();
    const [isDisabled, setDisabled] = useState<boolean>(true);

    const watchedValues = form.watch();

    useEffect(() => {
        const hasChanges =
            watchedValues.email.trim() !== email.trim() || watchedValues.name.trim() !== name.trim();
        setDisabled(!hasChanges);
    }, [watchedValues, email, name]);

    const handleSendEmail = async (otp: string) => {
        try {
            const { status, message } = await sendEmail<"sendOTP">(
                "johankirito64@gmail.com",
                "Email verification",
                "sendOTP",  
                {
                    otp,
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
            }
        } catch (error) {
            toast("Une erreur est survenue lors de l'envoi de l'email", {
                theme: "colored",
                type: "error",
            });
        }
    };

    const onSubmit = (data: ISettingsSchema) => {
        startTransition(async () => {});
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
        </div>
    );
};

export default ChangePersonalInfo;
