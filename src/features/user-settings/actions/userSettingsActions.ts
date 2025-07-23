"use server";

import { compareData, hashData } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { deleteFile, uploadFileLocal } from "@/lib/uploadFile";
import { isDevelopment } from "@/lib/utils";
import {
    ISecuritySchema,
    IUserSettingsSchema,
} from "@/lib/zod-schemas/settingsSchemas";
import { IResponseType } from "@/types";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import path from "node:path";

export const updateUser = async (
    data: IUserSettingsSchema & { image?: File | string },
    id: string,
): Promise<IResponseType<User | null>> => {
    try {
        const updatedUser = await prisma.$transaction(async (tx) => {
            const user = await getUser(tx, id);

            if (user.image) {
                await deleteFile(user.image);
            }

            let imagePath: string = data.image as string;

            if (data.image instanceof File) {
                const {
                    status,
                    message,
                    data: imageUploadedPath,
                } = await uploadFileLocal(
                    data.image as File,
                    "uploaded-client-avatars",
                    `${id.replaceAll(" ", "_").toLowerCase()}${path.extname(data.image.name)}`,
                );

                if (status === "error") {
                    throw new Error(message);
                }

                imagePath = imageUploadedPath!;
            }

            return await tx.user.update({
                data: {
                    image: imagePath,
                    name: data.name,
                    email: data.email,
                },
                where: {
                    id: user.id,
                },
            });
        });

        if (!updatedUser) {
            return {
                status: "error",
                message:
                    "Un erreur s'est produit lors de la mise à jour des informations",
            };
        }

        revalidatePath("/settings");

        return {
            status: "success",
            message: "Informations mis à jour",
            data: updatedUser,
        };
    } catch (err) {
        isDevelopment && console.error("error: ", err);
        return {
            status: "error",
            message:
                "Un erreur s'est produit lors de la mise à jour des informations",
        };
    }
};

export const updateUserPassword = async (
    data: ISecuritySchema,
    id: string,
): Promise<IResponseType<User | null>> => {
    try {
        const updatedUser = await prisma.$transaction(async (tx) => {
            const user = await getUser(tx, id);

            if (!(await compareData(data.password, user.password!))) {
                console.log("password did'nt match");
                throw new Error("Current password didn't match");
            }

            return await tx.user.update({
                data: {
                    password: await hashData(data.newPassword),
                },
                where: { id: user?.id },
            });
        });

        revalidatePath("/settings");

        return {
            status: "success",
            message: "Mot de passe mis à jour",
            data: updatedUser,
        };
    } catch (err) {
        isDevelopment && console.error("error: ", err);

        if (
            err instanceof Error &&
            err.message === "Current password didn't match"
        ) {
            return {
                status: "error",
                message:
                    "Le mot de passe actuel ne correspond pas, veuillez le revérifier",
            };
        }

        return {
            status: "error",
            message:
                "Un erreur s'est produit lors de la mise à jour des informations",
        };
    }
};
export const deleteUser = async (
    id: string,
): Promise<IResponseType<User | null>> => {
    try {
        const deletedUser = await prisma.$transaction(async (tx) => {
            const user = await getUser(tx, id);

            if (user.image) {
                await deleteFile(user.image);
            }

            return await tx.user.delete({
                where: { id: user?.id },
            });
        });

        revalidatePath("/settings");

        return {
            status: "success",
            message: "Utilisateur supprimé",
            data: deletedUser,
        };
    } catch (err) {
        isDevelopment && console.error("error: ", err);

        return {
            status: "error",
            message:
                "Un erreur s'est produit lors de la suppression de l'utilisateur",
        };
    }
};

const getUser = async (tx: any, id: string): Promise<User> => {
    const user = await tx.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new Error("No user found with id: " + id);
    }

    return user;
};
