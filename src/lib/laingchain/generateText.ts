import { SYSTEM_PROMPT } from "@/data/prompt-data";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableInterface } from "@langchain/core/runnables";
import { invokeChainText } from "./templateChain";

export const generateAIChat = async <T extends RunnableInterface>(
    userText: string,
    model: T,
    prompt: string = SYSTEM_PROMPT,
) => {
    // add chat template
    const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", prompt],
        ["user", "{text}"],
    ]);

    return await invokeChainText<T>(model, promptTemplate, { text: userText });
};
