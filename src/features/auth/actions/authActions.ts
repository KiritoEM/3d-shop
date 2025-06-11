"use server"

import { prisma } from "@/lib/prisma";
import { ILoginSchema, ISignupSchema } from "@/lib/zod-schemas/authSchemas";
import { IResponseType } from "../types";
import { compareData, hashData } from "@/lib/hash";

export const login = async (data: ILoginSchema): Promise<IResponseType<any>> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!user) {
            return {
                status: "error",
                message: "Veuillez vous assurer que cet adresse email existe"
            };
        }

        if (!compareData(data.password, user.password)) {
            return {
                status: "error",
                message: "Veuillez vous assurer que le mot de passe entré est valide"
            };
        }

        return {
            status: "success",
            message: "Login successful",
            data: {
                id: user.id,
                email: user.email
            }
        };
    }
    catch (err) {
        console.error(err);
        return {
            status: "error",
            message: "Un erreur s'est produit"
        };
    }
}

export const signup = async (data: ISignupSchema): Promise<IResponseType<any>> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (user) {
            return {
                status: "error",
                message: "L'utilisateur existe déja avec cet adresse email"
            };
        }

        const createdUser = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashData(data.password)
            }
        })

        if (createdUser) {
            return {
                status: "error",
                message: "Un erreur s'est produit"
            };
        }

        return {
            status: "success",
            message: "Login successful",
            data: { ...data }
        };
    }
    catch (err) {
        console.error(err);
        return {
            status: "error",
            message: "Un erreur s'est produit"
        };
    }
}