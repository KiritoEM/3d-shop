import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatIntoPrice = (price: number): string => {
  const arr = price.toString().split("");
  let res = [];

  for (let i = arr.length - 1; i >= 0; i -= 3) {
    let currSlice = "";

    for (let j = 0; j < 3 && (i - j) >= 0; j++) {
      currSlice += arr[i - j]
    }
    res.unshift(currSlice.split("").reverse().join(""));
  }

  return res.join(" ");
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