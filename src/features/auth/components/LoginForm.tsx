"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authSchema, ILoginSchema } from "@/lib/zod-schemas/authSchemas";
import { useForm } from "react-hook-form";
import {
    zodResolver
} from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleAuth from "./GoogleAuth";
import Separator from "./Separator";

const LoginForm = (): JSX.Element => {
    const form = useForm<ILoginSchema>({
        resolver: zodResolver(authSchema),
        mode: "onChange",
        defaultValues: {
            mode: "login",
            email: "",
            password: ""
        }
    });

    const onSubmit = (data: ILoginSchema) => {
        if (data.mode === "login") {
            console.log(data)
        }
    }
    return (
        <Form {...form}>
            <div className="login-form w-full max-w-[450px] flex flex-col space-y-10 items-center bg-background/70 px-10 py-12 border rounded-lg my-10">
                <h1 className="login-form__title font-michroma text-3xl">Se connecter</h1>

                <div className="space-y-6 w-full">
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                                        <Input placeholder="Votre mot de passe" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <p className="text-sm -mt-3 text-right">Mot de passe oublié?</p>

                        <Button className="h-10 w-full mt-1">Se connecter</Button>
                    </form>

                    <Separator />

                    <GoogleAuth />

                    <p className="signup-cta mt-2 w-fit mx-auto text-center">Pas encore de compte? <span className="cursor-pointer font-semibold text-blue-500">S'inscrire</span></p>
                </div>
            </div>
        </Form>
    );
};

export default LoginForm;