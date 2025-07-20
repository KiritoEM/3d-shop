"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import useRecaptcha from "@/hooks/useRecaptcha";
import { addAdminSchema, IAddAdminSchema } from "@/lib/zod-schemas/adminSchema";

const AddAccountForm = (): JSX.Element => {
    const form = useForm<IAddAdminSchema>({
        resolver: zodResolver(addAdminSchema),
        defaultValues: {
            username: "",
            role: "ADMIN",
            password: "",
        },
    });
    const [isPending, startTransition] = useTransition();
    const {
        recaptachaRef,
        recaptchaValue,
        getRecaptchaValue,
        handleChangeCaptcha,
    } = useRecaptcha();

    const onSubmit = () => {
        startTransition(async () => {});
    };

    return (
        <Form {...form}>
            <form
                className="mt-4 space-y-6"
                method="POST"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Nom admin"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput
                                    placeholder="Mot de passe admin"
                                    field={field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ReCAPTCHA
                    ref={recaptachaRef}
                    sitekey={
                        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
                    }
                    onChange={(token) => handleChangeCaptcha(token!)}
                />
                <div className="dialog-footer mt-4 flex justify-end space-x-4">
                    <Button variant="outline">Annuler</Button>
                    <Button
                        type="submit"
                        disabled={isPending || !recaptchaValue}
                    >
                        {isPending ? "Création..." : "Créer"}
                    </Button>
                </div>{" "}
            </form>
        </Form>
    );
};

export default AddAccountForm;
