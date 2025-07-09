"use server";

import { prisma } from "@/lib/prisma";
import { uploadFileLocal } from "@/lib/uploadFile";
import { isDevelopment } from "@/lib/utils";
import { IUserSettingsSchema } from "@/lib/zod-schemas/settingsSchemas";
import { IResponseType } from "@/types";
import { User } from "@prisma/client";
import path from "node:path";

export const updateUser = async (
    data: IUserSettingsSchema & { image?: File | string },
    id: string,
): Promise<IResponseType<User | null>> => {
    try {
        let imagePath: string = data.image as string;

        if (data.image instanceof File) {
            const {
                status,
                message,
                data: imageUploadedPath,
            } = await uploadFileLocal(
                data.image as File,
                "uploaded-client-avatars",
                `${data.name.replaceAll(" ", "_").toLowerCase()}${path.extname(data.image.name)}`,
            );

            if (status === "error") {
                throw new Error(message);
            }

            imagePath = imageUploadedPath!;
        }

        const userUpdated = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: {
                    id,
                },
            });

            return await tx.user.update({
                data: {
                    image: imagePath,
                    name: data.name,
                    email: data.email,
                },
                where: {
                    id: user?.id,
                },
            });
        });

        if (!userUpdated) {
            return {
                status: "error",
                message:
                    "Un erreur s'est produit lors de la mise à jour des informations",
            };
        }

        return {
            status: "success",
            message: "Informations mis à jour",
            data: userUpdated,
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
