"use server";

import { IResponseType } from "@/types";
import { writeFile } from "fs/promises";
import path from "path";
import { isDevelopment } from "./utils";
import { existsSync } from "fs";

export const uploadFileLocal = async (
    file: File,
    directory: string,
    filename: string,
): Promise<IResponseType<string | null>> => {
    if (!file) {
        return {
            status: "error",
            message: "Pas de fichier séléctionné",
        };
    }

    //convert file into Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        const filePath = path.join(process.cwd(), `/public/${directory}`);

        if (!isDirectoryExist(filePath)) {
            return {
                status: "error",
                message: "Le repértoire n'existe pas",
            };
        }

        await writeFile(path.join(filePath, filename), buffer);

        return {
            status: "success",
            message: "Fichier uploadé avec succés",
            data: `/${directory}/${filename}`,
        };
    } catch (err) {
        isDevelopment && console.error(err);

        return {
            status: "error",
            message: "Un erreur s'est produit lors de l'upload du fichier",
        };
    }
};

const isDirectoryExist = (path: string) => {
    return existsSync(path);
};
