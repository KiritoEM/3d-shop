"use client";

import { Stepper } from "@/components/ui/stepper";
import { MULTIFORM_DATA } from "@/data/panel-data";
import SectionHeader from "@/features/panel/components/SectionHeader";

const CreateProductContent = (): JSX.Element => {
    return (
        <div>
            <SectionHeader title="Ajout de produit" />

            <Stepper steps={MULTIFORM_DATA} className="mt-10" />
        </div>
    );
};

export default CreateProductContent;
