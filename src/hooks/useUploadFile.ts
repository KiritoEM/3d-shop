"use client";

import { IfileType } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

const useUploadFile = (fileType: IfileType, requiredFileType: string[]) => {
    const [uploadedFile, setFile] = useState<File | null>(null);

    const getDefaultMaxSize = (type: IfileType) => {
        switch (type) {
            case "IMAGE":
                return 5 * 1024 * 1024; // 5mb
            case "VIDEO":
                return 100 * 1024 * 1024; // 100mb
            default:
                return 10 * 1024 * 1024; // 10mb
        }
    };

    const getToast = (type: "TYPE_ERROR" | "SIZE-ERROR", maxSize?: number) => {
        switch (type) {
            case "TYPE_ERROR":
                toast(
                    `Type de fichier invalide, téléchargez uniquement un ${fileType.toLowerCase()}`,
                    {
                        type: "error",
                        theme: "colored",
                    },
                );
                break;
            case "SIZE-ERROR":
                toast(
                    `La taille du fichier doit être inférieur à ${maxSize} MB`,
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

    const handleUploadFile = (
        file: File | undefined | null,
        maxSize: number = getDefaultMaxSize(fileType),
    ) => {
        if (!file) {
            setFile(null);
            return;
        }

        if (!requiredFileType.includes(file.type)) {
            getToast("TYPE_ERROR");
            return;
        }

        if (maxSize && file.size > maxSize) {
            getToast("SIZE-ERROR", Math.round(maxSize / 1024 / 1024));
            return;
        }

        setFile(file);
    };

    const resetField = () => {
        setFile(null);
    };

    return {
        uploadedFile,
        handleUploadFile,
        resetField,
    };
};

export default useUploadFile;
