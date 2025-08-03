"use client";

import React, { FC } from "react";
import { ArrowUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoomActions from "./ZoomActions";

type StudioTopBarProps = {
    isMaterialsSelected: boolean;
};

const StudioTopBar: FC<StudioTopBarProps> = ({
    isMaterialsSelected,
}): JSX.Element => {
    return (
        <div className="top-bar absolute inset-4 z-30 h-fit">
            <div className="top-bar__container flex w-full justify-between gap-6">
                <ZoomActions />

                <div className="center">
                    {!isMaterialsSelected && (
                        <header className="materials-selection-header flex flex-col items-center text-center">
                            <p className="text-muted-foreground mt-1 max-w-[530px] text-[13px]">
                                Choisissez les éléments du modèle 3D que vous
                                souhaitez modifier ou personnaliser{" "}
                                <span className="text-primary">
                                    (Cliquer sur l'objet pour le sélectionner)
                                </span>
                            </p>
                        </header>
                    )}
                </div>

                <div className="top-bar__right">
                    {isMaterialsSelected && (
                        <div className="flex items-center gap-4">
                            <Button size="sm" variant="secondary">
                                <Download /> Capturer en png
                            </Button>

                            <Button size="sm">
                                <ArrowUp /> Créer le produit
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudioTopBar;
