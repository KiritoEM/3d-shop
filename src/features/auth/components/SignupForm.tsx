"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authSchema, IAuthData } from "@/lib/zod-schemas/authSchemas";
import { useForm } from "react-hook-form";
import {
    zodResolver
} from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleAuth from "./GoogleAuth";
import Separator from "./Separator";
import Link from "next/link";
import { signup } from "../actions/authActions";
import { redirect } from "next/navigation";
import { FC } from "react";
import { toast } from "react-toastify";

type SignupFormProps = {
    urlRedirect: string
}

const SignupForm: FC<SignupFormProps> = ({ urlRedirect }): JSX.Element => {
    const form = useForm<IAuthData>({
        resolver: zodResolver(authSchema),
        mode: "onChange",
        defaultValues: {
            mode: "signup",
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: IAuthData) => {
        if (data.mode === "signup") {
            const response = await signup(data);

            if (response.status === "success") {
                redirect(urlRedirect)
            }
            else if (response.status === "error") {
                toast(response.message, {
                    type: "error",
                    theme: "colored"
                })
            }
        }
    }
    return (
        <Form {...form}>
            <div className="login-form relative z-20 w-full max-w-[450px] flex flex-col space-y-10 items-center bg-background/90 dark:bg-background/70 px-10 py-12 border rounded-lg my-10">
                <h1 className="login-form__title font-michroma text-3xl">Créer un compte</h1>

                <div className="space-y-6 w-full">
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre com complet" type="text" {...field} />
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
                                        <Input placeholder="johndoe@gmail.com" type="email" {...field} />
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
                                        <Input placeholder="Créer votre mot de passe" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="h-10 w-full mt-1">S'inscrire</Button>
                    </form>

                    <Separator />

                    <GoogleAuth />

                    <p className="signup-cta mt-2 w-fit mx-auto text-center">Vous avez déja un compte? <Link href="/login" className="cursor-pointer hover:underline text-blue-500">Se connecter</Link></p>
                </div>
            </div>
        </Form>
    );
};

export default SignupForm;