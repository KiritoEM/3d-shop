"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type IfileType = "IMAGE" | "VIDEO";

const useUploadFile = (fileType: IfileType, requiredFileType: string[]) => {
    const [uploadedFile, setFile] = useState<File | null>(null);

    const getDefaultMaxSize = (type: IfileType) => {
        switch (type) {
            case "IMAGE":
                return 5 * 1024 * 1024; // 5mb
            case "VIDEO":
                return 100 * 1024 * 1024; //100mb

            default:
                return 10 * 1024 * 1024;
        }
    };

    const handleUploadFile = (
        e: React.ChangeEvent<HTMLInputElement>,
        maxSize: number = getDefaultMaxSize(fileType),
    ) => {
        if (!e.target.files) return;

        const file = e.target.files[0];

        if (!requiredFileType.includes(file.type)) {
            toast(
                `Type de fichier invalide, téléchargez uniquement un ${fileType.toLowerCase()}`,
                {
                    type: "error",
                    theme: "colored",
                },
            );

            return;
        }

        if (maxSize && file.size > maxSize) {
            toast(
                `La taille du fichier doit être inférieur à ${maxSize / 1024 / 1024} mb`,
                {
                    type: "error",
                    theme: "colored",
                },
            );

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
