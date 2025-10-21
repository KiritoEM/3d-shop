"use client";

import React, { FC } from "react";
import { ArrowUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoomActions from "./ZoomActions";

type StudioTopBarProps = {
    onCapture: () => void;
    onSave: () => void;
};

const StudioTopBar: FC<StudioTopBarProps> = ({
    onCapture,
    onSave,
}): JSX.Element => {
    return (
        <div className="top-bar absolute inset-4 z-30 h-fit">
            <div className="top-bar__container flex w-full justify-between gap-6">
                <ZoomActions />

                <div className="center">
                    <header className="materials-selection-header hidden sm:flex flex-col items-center text-center">
                        <p className="mt-1 max-w-[530px] text-[12px] text-white/80 lg:text-[13px]">
                            Choisissez les éléments du modèle 3D que vous
                            souhaitez modifier ou personnaliser{" "}
                            <span className="font-semibold text-white">
                                (Cliquer sur l'objet pour le sélectionner)
                            </span>
                        </p>
                    </header>
                </div>

                <div className="top-bar__right">
                    <div className="flex items-center gap-4">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={onCapture}
                        >
                            <Download /> <span className="hidden sm:block">Capturer</span>
                        </Button>

                        <Button size="sm" onClick={onSave}>
                            <ArrowUp /> Créer{" "}
                            <span className="hidden lg:block">le produit</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudioTopBar;
