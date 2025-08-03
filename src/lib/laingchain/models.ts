import { ChatGroq } from "@langchain/groq";

type IModelOptions = {
    temperature?: number;
    maxTokens?: number;
};

export const grokModel = (options: IModelOptions = {}): ChatGroq => {
    return new ChatGroq({
        model: "llama-3.3-70b-versatile",
        temperature: options.temperature || 0,
        maxRetries: 2,
        maxTokens: options.maxTokens || 700,
    });
};
