"use server";

import { prisma } from "@/lib/prisma";

export const getAllFaces = async () => {
    const allFaces = await prisma.adminFacialRecognition.findMany();

    return allFaces;
};
