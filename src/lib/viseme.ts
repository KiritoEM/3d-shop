import { CORRESPONDING_VISEME } from "@/constants/constants";

const pattern = "\[^a-zA-Z0-9]\g";

type IReturn = {
    viseme: string;
    value: string;
};

export const extractViseme = (text: string): IReturn[] => {
    const cleanText = text.replace(pattern, "").toUpperCase();
    let extractedVisemes: IReturn[] = [];

    for (let i = 0; i < cleanText.length; i++) {
        const word = cleanText[i];

        if (CORRESPONDING_VISEME[word as keyof typeof CORRESPONDING_VISEME]) {
            extractedVisemes.push({
                viseme: CORRESPONDING_VISEME[
                    word as keyof typeof CORRESPONDING_VISEME
                ],
                value: word,
            });
        }
    }

    return extractedVisemes;
};
