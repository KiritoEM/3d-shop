import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

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
