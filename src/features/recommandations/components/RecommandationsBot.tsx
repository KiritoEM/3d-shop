"use client";

import { useState } from "react";
import PromptInput from "./PromptInput";

const RecommandationsBot = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("");

    return (
        <div className="recommandations-bot w-[46%]">
            <div className="recommandations-bot__header mb-6 flex flex-col gap-4">
                <h1 className="text-3xl 2xl:text-4xl font-michroma leading-tight">
                    Décrivez votre recherche idéale
                </h1>
                <p className="text-foreground/80">Décrivez le produit que vous recherchez et notre IA trouvera les meilleures options pour vous.</p>
            </div>

            <PromptInput onSubmit={(value: string) => setInputValue(value)} />
        </div>
    );
};

export default RecommandationsBot;