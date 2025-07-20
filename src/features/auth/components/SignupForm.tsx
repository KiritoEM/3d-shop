"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { authSchema, IAuthData } from "@/lib/zod-schemas/authSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signup } from "../actions/authActions";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";
import { toast } from "react-toastify";
import useRecaptcha from "@/hooks/useRecaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyRecaptcha } from "@/services/recaptchaServices";

type SignupFormProps = {
    redirectUrl: string;
};

const SignupForm: FC<SignupFormProps> = ({ redirectUrl }): JSX.Element => {
    const router = useRouter();
    const form = useForm<IAuthData>({
        resolver: zodResolver(authSchema),
        mode: "onSubmit",
        defaultValues: {
            mode: "signup",
            name: "",
            email: "",
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

    const onSubmit = (data: IAuthData) => {
        startTransition(async () => {
            if (data.mode === "signup") {
                //Check recaptcha
                const recaptchaResponse = (await verifyRecaptcha(
                    getRecaptchaValue() as string,
                )) as any;

                if (recaptchaResponse.status === "error") {
                    toast(recaptchaResponse.message, {
                        type: "error",
                        theme: "colored",
                    });
                    return;
                }

                const response = await signup(data);

                if (response.status === "success") {
                    form.reset();
                    toast(
                        "Votre compte a été créé avec succés!!! Veuillez vous connecter pour continuer",
                        {
                            theme: "colored",
                            type: "success",
                        },
                    );
                    if (!redirectUrl) {
                        router.replace("/login");
                    } else {
                        router.replace(`/login?callbackUrl=${redirectUrl}`);
                    }
                } else if (response.status === "error") {
                    toast(response.message, {
                        type: "error",
                        theme: "colored",
                    });
                }
            }
        });
    };

    return (
        <Form {...form}>
            <div className="signup-form bg-background/90 dark:bg-background/70 relative z-20 my-10 flex w-full max-w-[380px] flex-col items-center space-y-10 rounded-lg border px-6 py-8 md:max-w-[400px] md:px-8 md:py-10 xl:max-w-[450px] xl:px-10 xl:py-12">
                <h1 className="signup-form__title font-michroma text-3xl">
                    Créer un compte
                </h1>

                <div className="w-full space-y-6">
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Votre nom complet"
                                            type="text"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="johndoe@gmail.com"
                                            type="email"
                                            {...field}
                                            disabled={isPending}
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
                                    <FormLabel>Confidentiel</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Créer votre mot de passe"
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
                                process.env
                                    .NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
                            }
                            onChange={(token) => handleChangeCaptcha(token!)}
                        />

                        <Button
                            className="mt-1 h-10 w-full"
                            type="submit"
                            disabled={isPending || !recaptchaValue}
                        >
                            {isPending
                                ? "Inscription en cours..."
                                : "S'inscrire"}
                        </Button>
                    </form>

                    <p className="signup-cta mx-auto mt-2 w-fit text-center">
                        Vous avez déjà un compte?{" "}
                        <Link
                            href="/login"
                            className="cursor-pointer text-blue-500 hover:underline"
                        >
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </Form>
    );
};

export default SignupForm;
