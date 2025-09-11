import { IfileType } from "@/types";
import path from "node:path";
import { toast } from "react-toastify";

export const truncateFileName = (
    fileName: string,
    maxLength: number,
): string => {
    if (fileName.length <= maxLength) {
        return fileName;
    }

    const extension = path.extname(fileName);
    const nameWithoutExt = path.basename(fileName, extension);

    const availableLength = maxLength - extension.length - 3;

    if (availableLength <= 0) {
        return `...${extension}`;
    }

    return `${nameWithoutExt.slice(0, availableLength)}...${extension}`;
};

export const getToast = (params: {
    type: "TYPE_ERROR" | "SIZE-ERROR";
    maxSize?: number;
    fileType?: IfileType;
}) => {
    switch (params.type) {
        case "TYPE_ERROR":
            toast(
                `Type de fichier invalide, téléchargez uniquement un ${getFiletypeName(params.fileType!)}`,
                {
                    type: "error",
                    theme: "colored",
                },
            );
            break;
        case "SIZE-ERROR":
            toast(
                `La taille du fichier doit être inférieur à ${params.maxSize} MB`,
                {
                    type: "error",
                    theme: "colored",
                },
            );
            break;

        default:
            break;
    }
};

// File handling
const getFiletypeName = (fileType: IfileType) => {
    switch (fileType) {
        case "IMAGE":
            return "image";
        case "VIDEO":
            return "vidéo";
        case "MODEL_3D":
            return "model 3d";

        default:
            break;
    }
};

export const validateFileType = <T extends string[]>(
    file: File,
    requiredFileType: T,
    maxSize?: number,
    fileType?: IfileType,
): boolean => {
    if (!requiredFileType.includes(file.type)) {
        getToast({ type: "TYPE_ERROR", fileType: fileType });
        return false;
    }

    if (maxSize && file.size > maxSize) {
        getToast({
            type: "SIZE-ERROR",
            maxSize: Math.round(maxSize / 1024 / 1024),
        });
        return false;
    }

    return true;
};
