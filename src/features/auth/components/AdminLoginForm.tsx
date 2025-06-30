"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { authSchema, IAuthData } from "@/lib/zod-schemas/authSchemas";
import Separator from "./Separator";
import FacialTrigger from "./FacialTrigger";

const AdminLoginForm = (): JSX.Element => {
    const form = useForm<IAuthData>({
        resolver: zodResolver(authSchema),
        mode: "onSubmit",
        defaultValues: {
            mode: "admin_login",
            name: "",
            password: "",
        },
    });
    return (
        <Form {...form}>
            <div className="signup-form bg-background/90 dark:bg-background/70 relative z-20 my-10 flex w-full max-w-[380px] flex-col items-center space-y-10 rounded-lg border px-6 py-8 md:max-w-[400px] md:px-8 md:py-10 xl:max-w-[440px] xl:px-10 xl:py-12">
                <h1 className="signup-form__title font-michroma w-full text-center text-xl sm:text-2xl">
                    Se connecter en tant qu'administrateur
                </h1>

                <div className="w-full space-y-6">
                    <form className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Nom admin"
                                            type="text"
                                            {...field}
                                            // disabled={isPending}
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

                        <Button
                            className="mt-1 h-10 w-full"
                            type="submit"
                            // disabled={isPending}
                        >
                            {/* {isPending ? "Inscription en cours..." : "S'inscrire"} */}
                            Se connecter
                        </Button>
                    </form>

                    <Separator />

                    <FacialTrigger />
                </div>
            </div>
        </Form>
    );
};

export default AdminLoginForm;
