"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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

type SignupFormProps = {
    redirectUrl: string
}

const SignupForm: FC<SignupFormProps> = ({ redirectUrl }): JSX.Element => {
    const router = useRouter();
    const form = useForm<IAuthData>({
        resolver: zodResolver(authSchema),
        mode: "onSubmit",
        defaultValues: {
            mode: "signup",
            name: "",
            email: "",
            password: ""
        }
    });
    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: IAuthData) => {
        startTransition(async () => {
            if (data.mode === "signup") {
                const response = await signup(data);

                if (response.status === "success") {
                    form.reset();
                    toast("Votre compte a été créé avec succés!!! Veuillez vous connecter pour continuer", {
                        theme: "colored",
                        type: "success"
                    })
                    if (!redirectUrl) {
                        router.replace("/login");
                    }
                    else {
                        router.replace(`/login?callbackUrl=${redirectUrl}`);
                    }
                } else if (response.status === "error") {
                    toast(response.message, {
                        type: "error",
                        theme: "colored"
                    });
                }
            }
        });
    };

    return (
        <Form {...form}>
            <div className="signup-form relative z-20 w-full max-w-[380px] md:max-w-[400px] xl:max-w-[450px] flex flex-col space-y-10 items-center bg-background/90 dark:bg-background/70 px-6 md:px-8 xl:px-10 py-8 md:py-10 xl:py-12 border rounded-lg my-10">
                <h1 className="signup-form__title font-michroma text-3xl">Créer un compte</h1>

                <div className="space-y-6 w-full">
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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

                        <Button
                            className="h-10 w-full mt-1"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? "Inscription en cours..." : "S'inscrire"}
                        </Button>
                    </form>

                    <p className="signup-cta mt-2 w-fit mx-auto text-center">
                        Vous avez déjà un compte?{" "}
                        <Link
                            href="/login"
                            className="cursor-pointer hover:underline text-blue-500"
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