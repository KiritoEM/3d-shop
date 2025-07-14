"use server";

import { prisma } from "@/lib/prisma";
import {
    IAdminLoginSchema,
    ISignupSchema,
} from "@/lib/zod-schemas/authSchemas";
import { IResponseType } from "../../../types";
import { hashData } from "@/lib/hash";
import { isDevelopment } from "@/lib/utils";
import { AdminInfo, User } from "@prisma/client";
import { createSession } from "@/lib/dbSession";

export const signup = async (
    data: ISignupSchema,
): Promise<IResponseType<User>> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (user) {
            return {
                status: "error",
                message: "L'utilisateur existe déja avec cet adresse email",
            };
        }

        const createdUser = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: await hashData(data.password),
            },
        });

        if (!createdUser) {
            return {
                status: "error",
                message: "Un erreur s'est produit",
            };
        }

        return {
            status: "success",
            message: "Login successful",
            data: createdUser,
        };
    } catch (err) {
        isDevelopment && console.error(err);
        return {
            status: "error",
            message: "Un erreur s'est produit",
        };
    }
};

export const loginAdmin = async (
    data: IAdminLoginSchema,
): Promise<IResponseType<AdminInfo>> => {
    try {
        const checkedAdminInfo = await prisma.adminInfo.findUnique({
            where: {
                username_password: {
                    username: data.name,
                    password: data.password,
                },
            },
        });

        if (!checkedAdminInfo) {
            return {
                status: "error",
                message:
                    "Veuillez vérifier le nom d'admin et le mot de passe admin",
            };
        }

        //create session if login successfull
        await createSession({ method: "FORM" }, checkedAdminInfo.id);

        return {
            status: "success",
            message:
                "Connexion réussie, vous allez être redirigé vers le panel",
            data: checkedAdminInfo,
        };
    } catch (err) {
        isDevelopment && console.error(err);
        return {
            status: "error",
            message: "Un erreur s'est produit lors de la connexion",
        };
    }
};
