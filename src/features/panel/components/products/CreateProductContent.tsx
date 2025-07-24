"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { MULTIFORM_DATA } from "@/data/panel-data";
import SectionHeader from "@/features/panel/components/SectionHeader";

const CreateProductContent = (): JSX.Element => {
    return (
        <div className="create-product-content">
            <SectionHeader
                title="Ajout de produit"
                titleButton={
                    <Button variant="ghost" asChild>
                        <Link href="/admin/products">
                            <ArrowLeft className="size-6" />
                        </Link>
                    </Button>
                }
            />

            <Stepper steps={MULTIFORM_DATA} className="mt-6" />
        </div>
    );
};

export default CreateProductContent;
