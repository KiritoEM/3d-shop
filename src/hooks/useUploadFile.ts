"use client";

import { useState } from "react";
import { IfileType } from "@/types";
import { validateFileType } from "@/lib/utils";

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

    const handleUploadFile = (
        file: File | undefined | null,
        maxSize: number = getDefaultMaxSize(fileType),
    ) => {
        if (!file) {
            return;
        }

        const isValidFile = validateFileType(file, requiredFileType, maxSize);

        if (isValidFile) {
            setFile(file);
        }
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
