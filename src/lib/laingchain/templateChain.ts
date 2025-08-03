import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableLike } from "@langchain/core/runnables";

export const invokeChainText = async <MT extends RunnableLike>(
    model: MT,
    promptTemplate: ChatPromptTemplate,
    templateVariable: Record<string, any>,
) => {
    await promptTemplate.format(templateVariable);

    //execute the prompt
    const chain = promptTemplate.pipe(model);
    const response = await chain.invoke(templateVariable);

    return response;
};
