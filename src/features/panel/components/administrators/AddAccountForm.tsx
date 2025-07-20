"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useTransition } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input, InputWithIcon } from "@/components/ui/input";
import useRecaptcha from "@/hooks/useRecaptcha";
import { addAdminSchema, IAddAdminSchema } from "@/lib/zod-schemas/adminSchema";
import useUploadFile from "@/hooks/useUploadFile";
import FileUploader from "@/components/ui/file-uploader";
import { IMAGE_TYPES } from "@/constants/constants";
import { DialogClose } from "@/components/ui/dialog";
import { copyTextClipboard, generatePassword } from "@/lib/utils";
import { Copy } from "lucide-react";
import { createNewAdmin } from "../../actions/adminActions";
import { toast } from "react-toastify";
import { useFormDialog } from "@/store/formDialog";

const AddAccountForm = (): JSX.Element => {
    const form = useForm<IAddAdminSchema>({
        resolver: zodResolver(addAdminSchema),
        defaultValues: {
            username: "",
            role: "ADMIN",
        },
    });
    const [isPending, startTransition] = useTransition();
    const {
        recaptachaRef,
        recaptchaValue,
        getRecaptchaValue,
        handleChangeCaptcha,
    } = useRecaptcha();
    const { handleUploadFile, resetField, uploadedFile } = useUploadFile(
        "IMAGE",
        IMAGE_TYPES,
    );
    const { setDialogState } = useFormDialog();
    const generatedPassworRef = useRef<string>("");

    useEffect(() => {
        generatedPassworRef.current = generatePassword(15);
    }, []);

    const onSubmit = (data: IAddAdminSchema) => {
        startTransition(async () => {
            const response = await createNewAdmin({
                ...data,
                image: (uploadedFile as File) ?? null,
                password: generatedPassworRef.current,
            });

            toast(response.message, {
                type: response.status === "error" ? "error" : "success",
                theme: "colored",
            });

            setDialogState(false);
        });
    };

    return (
        <Form {...form}>
            <form
                className="mt-4 space-y-6"
                method="POST"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div>
                    <FormLabel>Image de l'admin</FormLabel>
                    <FileUploader
                        FileType="IMAGE"
                        uploadedFile={uploadedFile}
                        reset={resetField}
                        onFileSelected={(e: File) => handleUploadFile(e)}
                        className="mt-2"
                    />
                    <p className="text-muted-foreground mt-2 text-[13px]">
                        Uploadez un image si vous voulez activer la
                        fonctionnalité de reconnaissance faciale pour cet admin
                    </p>
                </div>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom d'admin</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Créer un nom d'admin"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <InputWithIcon
                        iconPlace="right"
                        defaultValue={generatedPassworRef.current}
                        type="text"
                        Icon={
                            <Copy
                                className="size-4"
                                onClick={() =>
                                    copyTextClipboard(
                                        generatedPassworRef.current,
                                    )
                                }
                            />
                        }
                        placeholder=""
                    />
                </div>
                <ReCAPTCHA
                    ref={recaptachaRef}
                    sitekey={
                        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
                    }
                    onChange={(token) => handleChangeCaptcha(token!)}
                />
                <div className="dialog-footer mt-4 flex justify-end space-x-4">
                    <DialogClose asChild>
                        <Button variant="outline">Annuler</Button>
                    </DialogClose>
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
