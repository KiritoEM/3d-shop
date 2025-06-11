"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authSchema, IAuthData } from "@/lib/zod-schemas/authSchemas";
import { useForm } from "react-hook-form";
import {
    zodResolver
} from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import GoogleAuth from "./GoogleAuth";
import Separator from "./Separator";
import Link from "next/link";
import { login } from "../actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";
import { Button } from "@/components/ui/button";

type LoginFormProps = {
    urlRedirect: string
}

const LoginForm: FC<LoginFormProps> = ({ urlRedirect }): JSX.Element => {
    const form = useForm<IAuthData>({
        resolver: zodResolver(authSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            mode: "login",
            email: "",
            password: ""
        }
    });
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: IAuthData) => {
        startTransition(async () => {
            if (data.mode === "login") {
                const response = await login(data);

                if (response.status === "success") {
                    form.reset();
                    router.replace(urlRedirect || "/")
                }
                else if (response.status === "error") {
                    toast(response.message, {
                        type: "error",
                        theme: "colored"
                    })
                }
            }
        })

    }
    return (
        <Form {...form}>
            <div className="login-form relative z-20 w-full max-w-[450px] flex flex-col space-y-10 items-center bg-background/90 dark:bg-background/70 px-10 py-12 border rounded-lg my-10">
                <h1 className="login-form__title font-michroma text-3xl">Se connecter</h1>

                <div className="space-y-6 w-full">
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe@gmail.com" type="email" {...field} />
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
                                        <Input placeholder="Votre mot de passe" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <p className="text-sm -mt-3 text-right">Mot de passe oublié?</p>

                        <Button
                            className="h-10 w-full mt-1"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? "Connexion en cours..." : "Se connecter"}
                        </Button>
                    </form>

                    <Separator />

                    <GoogleAuth />

                    <p className="signup-cta mt-2 w-fit mx-auto text-center">Pas encore de compte? <Link href="/signup" className="cursor-pointer hover:underline  text-blue-500">S'inscrire</Link></p>
                </div>
            </div>
        </Form>
    );
};

export default LoginForm;