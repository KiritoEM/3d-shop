"use client";

import { FC, useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/input";
import {
    ISecuritySchema,
    securitySchema,
} from "@/lib/zod-schemas/settingsSchemas";
import { Button } from "@/components/ui/button";
import { updateUserPassword } from "../actions/userSettingsActions";

type SecurityFormProps = {
    id: string;
};

const SecurityForm: FC<SecurityFormProps> = ({ id }): JSX.Element => {
    const form = useForm<ISecuritySchema>({
        resolver: zodResolver(securitySchema),
        defaultValues: {
            password: "",
            newPassword: "",
        },
    });
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isPending, startTransition] = useTransition();

    const watchedValues = form.watch();

    const onSubmit = (data: ISecuritySchema) => {
        startTransition(async () => {
            const response = await updateUserPassword(data, id);

            toast(response.message, {
                theme: "colored",
                type: response.status === "error" ? "error" : "success",
            });

            if (response.status === "success") {
                form.reset();
            }
        });
    };

    useEffect(() => {
        const hasChanged =
            watchedValues.password.length > 0 &&
            watchedValues.newPassword.length > 0 &&
            watchedValues.password !== watchedValues.newPassword;

        setIsDisabled(!hasChanged);
    }, [watchedValues]);

    return (
        <Form {...form}>
            <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput
                                    field={field}
                                    className="w-full max-w-[360px] lg:max-w-[400px] xl:max-w-[440px]"
                                    placeholder="Votre ancien mot de passe"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="newPassword"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput
                                    field={field}
                                    className="w-full max-w-[360px] lg:max-w-[400px] xl:max-w-[440px]"
                                    placeholder="Votre nouveau mot de passe"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="min-w-[120px]"
                    disabled={isPending || isDisabled}
                >
                    {isPending ? "Mise à jour..." : "Mettre à jour"}
                </Button>
            </form>
        </Form>
    );
};

export default SecurityForm;
