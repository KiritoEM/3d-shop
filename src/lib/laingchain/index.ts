import { SYSTEM_PROMPT } from "@/constants/data/prompt-data";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    maxRetries: 2,
    maxTokens: 700,
});

export const generateAIChat = async (userText: string) => {
    // add chat template
    const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", SYSTEM_PROMPT],
        ["user", "{text}"],
    ]);

    await promptTemplate.format({
        text: userText,
    });

    //execute the prompt
    const chain = promptTemplate.pipe(model);
    const response = await chain.invoke({ text: userText });

    return response.content;
};
