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