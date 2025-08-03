import { TRANSLATE_MATERIALS_PROMPT } from "@/data/prompt-data";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { invokeChainText } from "./templateChain";
import { RunnableLike } from "@langchain/core/runnables";
import { I3DMaterial } from "@/types";

export const translate3DMaterials = async <T extends RunnableLike>(
    materials: I3DMaterial[],
    targetLanguage: "fr" | "ang" = "fr",
    model: T,
    prompt: string = TRANSLATE_MATERIALS_PROMPT,
) => {
    // add template
    const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", prompt],
    ]);

    return await invokeChainText<T>(model, promptTemplate, {
        materials_json: JSON.stringify(materials),
        target_language: targetLanguage,
    });
};
