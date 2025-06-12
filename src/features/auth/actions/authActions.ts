"use server"

import { prisma } from "@/lib/prisma";
import { ISignupSchema } from "@/lib/zod-schemas/authSchemas";
import { IResponseType } from "../types";
import { hashData } from "@/lib/hash";

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
                password: await hashData(data.password)
            }
        })

        if (!createdUser) {
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