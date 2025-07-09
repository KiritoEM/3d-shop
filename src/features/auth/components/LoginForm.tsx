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
import GoogleAuth from "./GoogleAuth";
import Separator from "./Separator";
import Link from "next/link";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { FC, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

type LoginFormProps = {
    callbackUrl: string;
    error?: string;
};

const LoginForm: FC<LoginFormProps> = ({ callbackUrl, error }): JSX.Element => {
    const form = useForm<IAuthData>({
        resolver: zodResolver(authSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            mode: "login",
            email: "",
            password: "",
        },
    });
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    //for existing email handling
    useEffect(() => {
        if (error === "account_already_exist_with_that_email") {
            toast(
                "Un compte existe déjà avec cet email. Connectez-vous avec votre mot de passe.",
                {
                    type: "error",
                    theme: "colored",
                },
            );
        }
    }, [error]);

    const onSubmit = (data: IAuthData) => {
        startTransition(async () => {
            if (data.mode === "login") {
                if (!callbackUrl) {
                    router.replace("/");
                }

                const response = await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    callbackUrl: `/${callbackUrl}`,
                    redirect: false,
                });

                if (response?.ok) {
                    form.reset();

                    if (callbackUrl === "/payment") {
                        router.replace("/payment");
                        router.refresh();
                    } else {
                        callbackUrl && redirect(callbackUrl);
                    }
                } else if (response?.error) {
                    toast("Email ou mot de passe incorrect", {
                        type: "error",
                        theme: "colored",
                    });
                }
            }
        });
    };
    return (
        <Form {...form}>
            <div className="login-form bg-background/90 dark:bg-background/70 relative z-20 my-10 flex w-full max-w-[380px] flex-col items-center space-y-10 rounded-lg border px-6 py-8 md:max-w-[400px] md:px-8 md:py-10 xl:max-w-[450px] xl:px-10 xl:py-12">
                <h1 className="login-form__title font-michroma text-center text-2xl md:text-3xl">
                    Se connecter
                </h1>

                <div className="w-full space-y-6">
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="johndoe@gmail.com"
                                            type="email"
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
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Confidentiel</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Votre mot de passe"
                                            field={field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <p className="-mt-3 text-right text-sm">
                            Mot de passe oublié?
                        </p>

                        <Button
                            className="mt-1 h-10 w-full"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending
                                ? "Connexion en cours..."
                                : "Se connecter"}
                        </Button>
                    </form>

                    <Separator />

                    <GoogleAuth callbackUrl={callbackUrl ?? "/"} />

                    <p className="signup-cta mx-auto mt-2 w-fit text-center">
                        Pas encore de compte?{" "}
                        <Link
                            href={`/signup${callbackUrl && `?redirectUrl=${callbackUrl}`}`}
                            className="cursor-pointer text-blue-500  hover:underline"
                        >
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </div>
        </Form>
    );
};

export default LoginForm;
