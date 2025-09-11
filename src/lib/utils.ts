import { clsx, type ClassValue } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export type Prettify<T> = {
    [K in keyof T]: T[K];
};

export const isDevelopment = process.env.NODE_ENV === "development";

export const isServer = typeof window === "undefined";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const normalizeStr = (str: string) => {
    if (typeof str !== "string") return "";
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zÀ-ÿ0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .replace(/_+/g, "_");
};

export const cleanTextForSpeech = (str: string) => {
    if (typeof str !== "string") return "";
    return (
        str
            //remove markdown and set only text
            .replace(/^#{1,6}\s+/gm, "")
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .replace(/\*(.*?)\*/g, "$1")
            .replace(/__(.*?)__/g, "$1")
            .replace(/_(.*?)_/g, "$1")
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
            .replace(/!\[([^\]]*)\]\([^\)]+\)/g, "")
            .replace(/`([^`]+)`/g, "$1")
            .replace(/```[\s\S]*?```/g, "")
            .replace(/^>\s+/gm, "")
            .replace(/^[\s]*[-\*\+]\s+/gm, "")
            .replace(/^\d+\.\s+/gm, "")
            .replace(/^---+$/gm, "")
            .replace(/^\*\*\*+$/gm, "")
            .replace(/\|.*?\|/g, "")
            .replace(/\s+/g, " ")

            //remove emoji
            .replace(
                /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
                "",
            )
            .replace(/[^\w\s\.,!?;:()"-]/g, "")
            .replace(/\s+/g, " ")
            .trim()
    );
};

export const generatePassword = (length: number = 12) => {
    const LOWER = "abcdefghijklmnopqrstuvwxyz";
    const UPPER = LOWER.toUpperCase();
    const NUM = "0123456789";
    const chars = LOWER + UPPER + NUM;
    let passwordGen = "";

    for (let i = 0; i < length; i++) {
        const randomIdx = Math.floor(Math.random() * chars.length);
        passwordGen += chars[randomIdx];
    }

    return passwordGen;
};

export const formatIntoPrice = (price: number): string => {
    const arr = price.toString().split("");
    let res = [];

    for (let i = arr.length - 1; i >= 0; i -= 3) {
        let currSlice = "";

        for (let j = 0; j < 3 && i - j >= 0; j++) {
            currSlice += arr[i - j];
        }
        res.unshift(currSlice.split("").reverse().join(""));
    }

    return res.join(" ");
};

export const handleInputFileChange = (
    onFileSelected: (e: File) => void,
    e: React.ChangeEvent<HTMLInputElement>,
) => {
    e.preventDefault();
    onFileSelected(e.target.files?.[0] as File);
};

export function pickObjectField<T, K extends keyof T>(
    object: T,
    keys: K[],
): Pick<T, K> {
    const result = {} as Pick<T, K>;

    keys.forEach((k) => {
        if (object[k]) {
            result[k] = object[k];
        }
    });

    return result;
}

export function fillDataGroupbyMonth<
    T extends { month: number; count: number },
>(data: T[]) {
    let resultData = [];

    for (let i = 0; i < 12; i++) {
        const hasMonthData = data.some((item) => Number(item.month) === i);

        if (hasMonthData) {
            resultData.push({
                month: `${i}`,
                count: data.find((item) => Number(item.month) === i)?.count,
            });
        } else {
            resultData.push({
                month: `${i}`,
                count: 0,
            });
        }
    }

    return resultData;
}

export const sortDataByDate = (data: any) => {
    return [...data].sort((a, b) => {
        return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    });
};

export const isFunction = (func: unknown): func is Function => {
    return typeof func === "function";
};

export const copyTextClipboard = (value: any) => {
    navigator.clipboard.writeText(value);

    toast("Texte copié dans le presse-papier", {
        type: "success",
    });
};
