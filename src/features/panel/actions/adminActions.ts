"use server";

import path from "path";
import { AdminInfo } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { deleteFile, uploadFileLocal } from "@/lib/uploadLocalFile";
import { isDevelopment } from "@/lib/utils";
import { IAddAdminSchema } from "@/lib/zod-schemas/adminSchema";
import { IResponseType } from "@/types";
import { revalidatePath } from "next/cache";
import { getSession, getToken } from "@/lib/sessions/dbSession";
import { redirect } from "next/navigation";
import { logoutAdmin } from "@/features/auth/actions/authActions";

export const createNewAdmin = async (
    data: IAddAdminSchema & { image?: File; password: string },
): Promise<IResponseType<AdminInfo | null>> => {
    try {
        let imagePath: string | null = null;

        if (data.image instanceof File) {
            const {
                status,
                message,
                data: imageUploadedPath,
            } = await uploadFileLocal(
                data.image as File,
                "uploaded-admin-avatars",
                `${data.username.replaceAll(" ", "_").toLowerCase()}${path.extname(data.image.name)}`,
            );

            if (status === "error") {
                throw new Error();
            }

            imagePath = imageUploadedPath!;
        }

        const adminAdded = await prisma.$transaction(async (tx) => {
            const existingAdmin = await tx.adminInfo.findUnique({
                where: { username: data.username },
            });

            if (existingAdmin) {
                throw new Error("Admin exist already");
            }

            const adminInfoAdded = await tx.adminInfo.create({
                data: {
                    username: data.username,
                    password: data.password,
                    role: data.role,
                },
            });

            if (imagePath) {
                await tx.adminFacialRecognition.create({
                    data: {
                        admin: {
                            connect: {
                                id: adminInfoAdded.id,
                            },
                        },
                        image: imagePath,
                    },
                });
            }

            return adminInfoAdded;
        });

        revalidatePath("/admin/administrator");

        return {
            status: "success",
            message: "Admin créé avec succès",
            data: adminAdded,
        };
    } catch (err) {
        isDevelopment &&
            console.error("Erreur lors de la création de l'admin:", err);

        if (err instanceof Error && err.message) {
            return {
                status: "error",
                message: "L'administrateur avec ce nom existe déja",
            };
        }

        return {
            status: "error",
            message: "Erreur lors de la création de l'admin",
            data: null,
        };
    }
};

export const deleteAdminById = async (
    adminId: string,
): Promise<IResponseType<AdminInfo | null>> => {
    try {
        const deletedAdmin = await prisma.adminInfo.delete({
            where: {
                id: adminId,
            },
            include: {
                adminFacial: true,
            },
        });

        if (!deletedAdmin) {
            throw new Error();
        }

        if (deletedAdmin.adminFacial) {
            const { status } = await deleteFile(deletedAdmin.adminFacial.image);

            if (status === "error") {
                throw new Error();
            }
        }

        const token = await getToken();
        const currentSession = await getSession(token ?? "");

        if (currentSession.id === adminId) {
            await logoutAdmin(token ?? "");
            redirect("/admin/login");
        }

        revalidatePath("/admin/administrator");

        return {
            status: "success",
            message: "Admin supprimé avec succès",
            data: deletedAdmin,
        };
    } catch (err) {
        isDevelopment &&
            console.error("Erreur lors de la suppresion de l'admin:", err);

        return {
            status: "error",
            message: "Erreur lors de la suppresion de l'admin",
            data: null,
        };
    }
};
