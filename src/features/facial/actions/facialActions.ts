"use server";

import { prisma } from "@/lib/prisma";
import { isDevelopment } from "@/lib/utils";

export const getAllFaces = async () => {
    try {
        const allFaces = await prisma.adminFacialRecognition.findMany();

        return allFaces;
    } catch (err) {
        isDevelopment && console.error(err);
        return [];
    }
};

export const getAdminById = async (id: string) => {
    try {
        const adminInfo = await prisma.adminInfo.findUnique({
            where: {
                id,
            },
        });

        return adminInfo;
    } catch (err) {
        isDevelopment && console.error(err);
        return {};
    }
};
